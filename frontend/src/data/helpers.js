export const dateFormatSK = (date) => {
    return new Date(date).toLocaleDateString('sk-SK');
}
export const endDateFormatSK = (date) => {
    return new Date(Math.abs(new Date(date).getTime() + 1000 * 60 * 60 * 24 * 30)).toLocaleDateString('sk-SK')
}
export const isDateExpired = (date) => {
    return Math.abs(new Date(date).getTime() + 1000 * 60 * 60 * 24 * 30) < new Date();
}