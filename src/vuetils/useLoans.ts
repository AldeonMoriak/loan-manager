/* eslint-disable @typescript-eslint/camelcase */
import { supabase } from "../helpers/supabase";
import { ref } from "vue";
import { Loan, Transaction } from "../helpers/interfaces";
import { store } from "../store";

const allLoans = ref<Loan[]>([]);

/**
 * Retrieve all todo for the signed in user
 */
async function fetchLoans() {
  try {
    const { data: loans, error }: { data: Loan[] | null; error: any } =
      await supabase
        .from("loans")
        .select("*, transactions(*)")
        .eq("user_id", store.user?.id)
        .order("id");

    if (error) {
      console.log("error", error);
      return;
    }
    // handle for when no todos are returned
    if (loans === null) {
      allLoans.value = [];
      return;
    }

    loans.map((loan) => {
      let payedAmount = 0;
      if (loan.transactions) {
        loan.transactions.forEach((transaction) => {
          payedAmount += transaction.amount;
        });
      }
      loan.remainder = loan.total_amount - payedAmount;
    });
    // store response to allTodos
    allLoans.value = loans;
    console.log("got loans!", allLoans.value);
  } catch (err) {
    console.error("Error retrieving data from db", err);
  }
}

/**
 *  Add a new loan to supabase
 */
async function addLoan(loan: Loan): Promise<null | Loan> {
  try {
    const { data, error } = await supabase.from("loans").insert(loan).single();

    if (error) {
      alert(error.message);
      console.error("There was an error inserting", error);
      return null;
    }

    console.log("created a new loan");
    return data;
  } catch (err) {
    alert("Error");
    console.error("Unknown problem inserting to db", err);
    return null;
  }
}

/**
 * 
 * add a new transaction
 */
async function addTransaction(transaction: Transaction): Promise<null | Transaction> {
  try {
    const { data, error } = await supabase.from("transactions").insert(transaction).single();

    if (error) {
      alert(error.message);
      console.error("There was an error inserting", error);
      return null;
    }

    console.log("created a new transaction");
    return data;
  } catch (err) {
    alert("Error");
    console.error("Unknown problem inserting to db", err);
    return null;
  }
}

/**
 * Targets a specific todo via its record id and updates the is_completed attribute.
 */
async function updatePaymentCompletion(loan: Loan, isCompleted: boolean) {
  try {
    const { error } = await supabase
      .from("loans")
      .update({ is_complete: isCompleted })
      .eq("id", loan.id)
      .single();

    if (error) {
      alert(error.message);
      console.error("There was an error updating", error);
      return;
    }

    console.log("Updated loan", loan.id);
  } catch (err) {
    alert("Error");
    console.error("Unknown problem updating record", err);
  }
}

/**
 *  Deletes a todo via its id
 */
async function deleteLoan(loan: Loan) {
  try {
    await supabase.from("loans").delete().eq("id", loan.id);
    console.log("deleted loan", loan.id);
  } catch (error) {
    console.error("error", error);
  }
}

export { allLoans, fetchLoans, addLoan, addTransaction, updatePaymentCompletion, deleteLoan };
