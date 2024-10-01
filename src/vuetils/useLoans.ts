/* eslint-disable @typescript-eslint/camelcase */
import { supabase } from "../helpers/supabase";
import { ref } from "vue";
import { Loan, Transaction } from "../helpers/interfaces";
import { store } from "../store";
import { PostgrestError } from "@supabase/supabase-js";

const allLoans = ref<Loan[]>([]);

function computeRemainder(loan: Loan): Loan {
  let payedAmount = 0;
  if (loan.transactions) {
    loan.transactions.forEach((transaction) => {
      payedAmount += transaction.amount;

      transaction.created_at = new Date(
        transaction.created_at as string
      ).toLocaleString();
    });
  }
  loan.remainder = loan.total_amount - payedAmount;
  return loan;
}
/**
 * Retrieve all todo for the signed in user
 */
async function fetchLoans() {
  store.loading = true;
  try {
    const { data: loans, error }: { data: Loan[] | null; error: any } =
      await supabase
        .from("loans")
        .select("*, transactions(*)")
        .eq("user_id", store.user?.id)
        .order("created_at", { ascending: false })
        .order("created_at", {
          foreignTable: "transactions",
          ascending: false,
        });

    if (error) {
      store.loading = false;
      console.log("error", error);
      return;
    }
    // handle for when no todos are returned
    if (loans === null) {
      store.loading = false;
      allLoans.value = [];
      return;
    }

    loans.forEach((loan) => {
      computeRemainder(loan);
    });

    // store response to allTodos
    allLoans.value = loans;
    store.loading = false;
  } catch (err) {
    store.loading = false;
    console.error("Error retrieving data from db", err);
  }
}

/**
 *  Add a new loan to supabase
 */
async function addLoan(
  loan: Loan
): Promise<
  { error: PostgrestError; data: null } | { data: Loan; error: null }
> {
  store.loading = true;
  try {
    const { data, error } = await supabase.from("loans").insert(loan).select().single();

    if (error) {
      console.error("There was an error inserting", error);
      return { error, data: null };
    }

    console.log("created a new loan");
    store.loading = false;
    return { data: data!, error: null };
  } catch (err) {
    store.loading = false;
    console.error("Unknown problem inserting to db", err);
    return {
      error: {
        message: store.dir === "rtl" ? "خطا" : "Error",
        details: "",
        hint: "",
        code: "",
      },
      data: null,
    };
  }
}

async function updateLoan(
  loan: Loan
): Promise<
  { error: PostgrestError; data: null } | { data: Loan; error: null }
> {
  store.loading = true;
  try {
    const { data, error } = await supabase
      .from("loans")
      .update({...loan})
      .eq("id", loan.id)
      .select()
      .single();

    if (error) {
      store.loading = false;
      console.error("There was an error updating the loan", error);
      return { error, data: null };
    }

    store.loading = false;
    return { data: data!, error: null };
  } catch (err) {
    store.loading = false;
    console.error("Unknown problem updating", err);
    return {
      error: {
        message: store.dir === "rtl" ? "خطا" : "Error",
        details: "",
        hint: "",
        code: "",
      },
      data: null,
    };
  }
}

/**
 * Targets a specific todo via its record id and updates the is_completed attribute.
 */
async function updatePaymentCompletion(loan: Loan, isCompleted: boolean) {
  store.loading = true;
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
    store.loading = false;

    console.log("Updated loan", loan.id);
  } catch (err) {
    store.loading = false;
    alert("Error");
    console.error("Unknown problem updating record", err);
  }
}

/**
 *  Deletes a todo via its id
 */
async function deleteLoan(loan: Loan): Promise<PostgrestError | undefined> {
  store.loading = true;
  try {
    const { error, data } = await supabase
      .from("loans")
      .delete()
      .eq("id", loan.id);
    store.loading = false;
    if (error) {
      console.log(error.message);
      return error;
    }
    console.log("deleted loan", loan.id);
  } catch (error) {
    store.loading = false;
    console.error("error", error);
  }
}

export {
  allLoans,
  fetchLoans,
  addLoan,
  updateLoan,
  updatePaymentCompletion,
  deleteLoan,
  computeRemainder,
};
