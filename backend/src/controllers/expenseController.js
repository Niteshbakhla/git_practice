import Expense from "../models/expenseModel.js"


export const createExpense = async (req, res) => {
            try {
                        const { title, date } = req.body;
                        const dateString = date;
                        const [day, month, year] = dateString.split("/");
                        const dateObj = new Date(`${year}-${month}-${day}`);
                        req.body.date = dateObj;
                        const expense = await Expense.create({ ...req.body });
                        res.status(201).json({ message: "Expense is created ", expense });
            } catch (error) {
                        res.status(500).json({ message: "Internal server error", error: error.message })
            }
}
function convertISOToNormal(isoString) {
            const date = new Date(isoString);
            return date.toLocaleDateString("en-GB"); // returns "DD/MM/YYYY"
}


export const getSingleExpense = async (req, res) => {
            try {
                        const expenseId = req.params.expenseId;
                        const expense = await Expense.findById(expenseId)
                        const expenseObj = expense.toObject();

                        const expenseDate = {
                                    ...expenseObj,
                                    date: convertISOToNormal(expenseObj.date)
                        };

                        res.status(200).json({ expense: expenseDate });
            } catch (error) {
                        res.status(500).json({ message: "Internal server error" })
            }
}

export const getExpense = async (req, res) => {
            try {
                        const category = req.query.category;
                        const month = parseInt(req.query.month)
                        const year = parseInt(req.query.year) || new Date().getFullYear();

                        const startDate = new Date(Date.UTC(year, month - 1, 1));
                        const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));
                        let filter = {}
                        if (month) {
                                    filter.date = { $gte: startDate, $lte: endDate }
                        };
                        if (category) filter.category = category;

                        if (month && category) {
                                    filter.month = month;
                                    filter.category = category;
                        }
                        const expense = await Expense.find(filter);


                        res.status(200).json({ expense })
            } catch (error) {
                        res.status(500).json({ message: "Internal server error" });
            }
}


export const updateExpense = async (req, res) => {
            try {
                        const { date } = req.body;
                        const dateString = date;
                        const [day, month, year] = dateString.split("/");
                        const dateObj = new Date(`${year}-${month}-${day}`);
                        req.body.date = dateObj;
                        const expenseId = req.params.expenseId;


                        const expense = await Expense.findByIdAndUpdate(
                                    expenseId,        // <-- pass the ID directly
                                    { ...req.body },  // <-- update fields
                                    { new: true }     // <-- return the updated document
                        );
                        res.status(200).json({ expense, message: "expense updated successfully" })
            } catch (error) {
                        res.status(500).json({ message: "Internal server error", error: error.message })
            }
}

export const deleteExpense = async (req, res) => {

            try {
                        const expenseId = req.params.expenseId;
                        await Expense.findByIdAndDelete(expenseId);
                        res.status(200).json({ message: "Expense Deleted" });
            } catch (error) {
                        res.status(500).json({ message: "Internal server error" });
            }
}