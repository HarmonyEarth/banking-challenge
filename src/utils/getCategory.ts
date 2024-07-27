import { CATEGORY } from "../constants";

export const getCategory = (name: string): CATEGORY => {
  const categories: { [key: string]: CATEGORY } = {
    "ACME LLC": CATEGORY.INCOME,
    "Example Bank": CATEGORY.FINANCIAL,
    "Local Grocer": CATEGORY.GROCERIES,
    "Tech Corp": CATEGORY.SHOPPING,
    "Green Valley": CATEGORY.GROCERIES,
    "Cafe Central": CATEGORY.DINING,
    "Freelance Gig": CATEGORY.INCOME,
    "Online Store": CATEGORY.SHOPPING,
    "Monthly Salary": CATEGORY.INCOME,
    "Utility Provider": CATEGORY.UTILITIES,
    "Insurance Co.": CATEGORY.HEALTHCARE,
    "Rent Payment": CATEGORY.MISCELLANEOUS,
    "Health Clinic": CATEGORY.HEALTHCARE,
    Bookstore: CATEGORY.SHOPPING,
    "Side Job Payment": CATEGORY.INCOME,
    "Pet Supplies": CATEGORY.SHOPPING,
    "Gift Shop": CATEGORY.SHOPPING,
    "Dining Out": CATEGORY.DINING,
    "Department Store": CATEGORY.SHOPPING,
    "Clothing Store": CATEGORY.SHOPPING,
    "Coffee Shop": CATEGORY.DINING,
    "Investment Co.": CATEGORY.INCOME,
    "Fitness Center": CATEGORY.FITNESS,
    "Online Course": CATEGORY.SUBSCRIPTIONS,
    "Subscription Service": CATEGORY.SUBSCRIPTIONS,
    Refund: CATEGORY.INCOME,
    "ATM Withdrawal": CATEGORY.FINANCIAL,
    "Nuevo Seoul": CATEGORY.DINING,
  };
  return categories[name] || CATEGORY.MISCELLANEOUS; // Default to 'Miscellaneous' if not found
};
