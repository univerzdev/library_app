export const TABLE_STUDENTS_FIELDS = [
    'ID študenta',
    'Meno študenta',
    'Požičaná kniha',
    'Počet požičaných kníh',
    'Akcie'
];

export const TABLE_BOOKS_FIELDS = [
    'ID Knihy',
    'Názov',
    'Rok',
    'ISBN',
    'Stav',
    'Požičaná od',
    'Platnosť do',
    'Akcie'
];

export const TABLE_BOOKS_HISTORY_FIELDS = [
    'ID Knihy',
    'Názov',
    'Rok',
    'ISBN',
    'Požičaná od',
    'Platnosť do'
];

export const TABLE_LIBRARIES_FIELDS = [
    'ID knižnice',
    'Názov knižnice',
    'Akcie'
];

export const TYPES_RESORUCES  = {
    LIBRARIES: 'libraries',
    BOOKS: 'books',
    STUDENTS: 'students'
}