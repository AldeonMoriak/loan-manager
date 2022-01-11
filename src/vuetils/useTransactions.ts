/* eslint-disable @typescript-eslint/camelcase */
import { supabase } from "../helpers/supabase";
import { ref } from "vue";
import { Loan, Transaction } from "../helpers/interfaces";
import { store } from "../store";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * Retrieve all todo for the signed in user
 */

/**
 *
 * add a new transaction
 */
async function addTransaction(
  transaction: Transaction
): Promise<null | Transaction> {
  store.loading = true;
  try {
    const { data, error } = await supabase
      .from("transactions")
      .insert(transaction)
      .single();

    if (error) {
      alert(error.message);
      console.error("There was an error inserting", error);
      return null;
    }

    console.log("created a new transaction");
    store.loading = false;
    return data;
  } catch (err) {
    store.loading = false;
    alert("Error");
    console.error("Unknown problem inserting to db", err);
    return null;
  }
}

/**
 * Targets a specific todo via its record id and updates the is_completed attribute.
 */
async function updateTransaction(transaction: Transaction) {
  store.loading = true;
  try {
    const { error } = await supabase
      .from("transactions")
      .update({ ...transaction })
      .eq("id", transaction.id)
      .single();

    if (error) {
      alert(error.message);
      console.error("There was an error updating", error);
      return;
    }
    store.loading = false;

    console.log("Updated transaction", transaction.id);
  } catch (err) {
    store.loading = false;
    alert("Error");
    console.error("Unknown problem updating record", err);
  }
}

/**
 *  Deletes a todo via its id
 */
async function deleteTransaction(transaction: Transaction): Promise<PostgrestError | undefined> {
  store.loading = true;
  try {
    const {error, data } = await supabase.from("transactions").delete().eq("id", transaction.id);
    if(error) {
      return error;
    }
    store.loading = false;
    console.log("deleted transaction", transaction.id);
  } catch (error) {
    store.loading = false;
    console.error("error", error);
  }
}

export {
  addTransaction,
  updateTransaction,
  deleteTransaction,
};