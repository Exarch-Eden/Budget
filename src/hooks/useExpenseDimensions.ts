import { useEffect, useState } from "react"

const useExpenseDimensions = () => {
    /**
     * Used to store the dynamically-calculated width of the parent scrollview
     * holding the pie charts so that said charts can match it.
     */
     const [expenseViewWidth, setExpenseViewWidth] = useState(0)

     /** 
      * Used to store the height of the parent scrollview to dynamically
      * calculate MonthlyExpenseList's height.
      */
     const [expenseViewHeight, setExpenseViewHeight] = useState(0)
 
     /**
      * Used to store the initial Y value of MonthlyExpenseList to dynamically
      * calculate its height.
      */
     const [expenseListY, setExpenseListY] = useState(0)
 
     /**
      * Stores the dynamic height calculation of MonthlyExpenseList (expenseViewHeight - expenseListY).
      */
     const [expenseListHeight, setExpenseListHeight] = useState(0)

     useEffect(() => {
        console.log('expenseListHeight set process useEffect');
        console.log('expense calculations: ', {
            expenseViewHeight,
            expenseListY
        });

        if (!expenseViewHeight || !expenseListY) return;

        console.log('setting expense list height: ', expenseViewHeight - expenseListY);

        setExpenseListHeight(expenseViewHeight - expenseListY)
    }, [expenseViewHeight, expenseListY])

    return {
        // getters
        expenseViewWidth,
        expenseViewHeight,
        expenseListY,
        expenseListHeight,
        // setters
        setExpenseViewWidth,
        setExpenseViewHeight,
        setExpenseListY,
        setExpenseListHeight
    }
}

export {
    useExpenseDimensions
}