"use server"

import { connectToDatabase } from "../mongoose"

export async function createQuestion
(params: any) {
  // eslint-disable-next-line no-empty
  connectToDatabase()
  try{
    // connect to DBQ
  } catch (error) {

  }
}