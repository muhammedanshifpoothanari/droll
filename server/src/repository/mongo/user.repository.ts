// src/repositories/UserRepository.ts

import { IUserRepository } from "../../interfaces/repository.interface.js";
import { IUser, IDBUser } from "../../interfaces/entity.interface.js";
import { IUserModel } from "./models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface BuildUserRepositoryParams {
  database: IUserModel;
  jwtSecret: string; // Secret key for JWT
}

export default function buildUserRepository({
  database,
  jwtSecret,
}: BuildUserRepositoryParams): IUserRepository {
  return Object.freeze({
    // CRUD Operations
    addUser: async (userData: IUser): Promise<any> => {
      // Check if email or username already exists
      const existingUser = await database.findOne({
       email:userData?.email,
      });

      if (existingUser) {
        throw new Error("Username or email already exists");
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      // Create the user
      const newUser = new database({
        ...userData,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      return savedUser;
    },

    getUsers: async (): Promise<IDBUser[]> => {
      return await database.find({});
    },

    getUser: async ({ userId }: { userId: string }): Promise<IDBUser | null> => {
      return await database.findById(userId);
    },

    updateUser: async ({
      userId,
      userData,
    }: {
      userId: string;
      userData: Partial<IUser>;
    }): Promise<boolean> => {
      // If password is being updated, hash it
      if (userData.password) {
        const saltRounds = 10;
        userData.password = await bcrypt.hash(userData.password, saltRounds);
      }

      const response = await database.updateOne(
        { _id: userId },
        userData
      );
      return response.modifiedCount > 0;
    },

    removeUser: async ({ userId }: { userId: string }): Promise<boolean> => {
      const response = await database.deleteOne({ _id: userId });
      return response.deletedCount > 0;
    },

    // Authentication Methods
    signUp: async (userData: IUser): Promise<IUser> => {
      // Reuse addUser method
      const newUser = await this.addUser(userData);
      // Exclude password before returning
      const userObj = newUser.toObject();
      delete userObj.password;
      return userObj as IUser;
    },

    signIn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<{ user: IUser; token: string }> => {
      // Find the user by email
      const user = await database.findOne({ email });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Invalid email or password");
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id },
        jwtSecret,
        { expiresIn: "10h" } // Token expires in 1 hour
      );

      // Exclude password before returning
      const userObj = user.toObject();
      delete userObj.password;

      return { user: userObj as IUser, token };
    },
  });
}
