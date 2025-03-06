export const returnCurrentMonth = (date: string) => {
    const monthNames = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]

    const month = new Date(date).getMonth()
    const monthName = monthNames[month]

    return monthName
}