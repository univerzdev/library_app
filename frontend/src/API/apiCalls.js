export const fetchAllData = async (type) => {
    const response = await fetch(`/api/${type}/`);
    if (!response.ok) {
        throw new Error('Something were wrong');
    }
    const data = await response.json();
    return data;
};

export const fetchSingleItem = async (type, id) => {
    const response = await fetch(`/api/${type}/${id}`);
    if (!response.ok) {
        throw new Error('Something were wrong');
    }
    const data = await response.json();
    return data;
};

export const fetchLibraryData = async (id) => {
    const response = await fetch(`/api/libraries/${id}`);
    if (!response.ok) {
        throw new Error('Something were wrong');
    }
    const data = await response.json();
    return data;
};

export const fetchLibraryStudents = async (id) => {
    const response = await fetch(`/api/students/library/${id}`);
    if (!response.ok) {
        throw new Error('Something were wrong');
    }
    const data = await response.json();
    return data;
};

export const fetchLibraryBooks = async (id) => {
    const response = await fetch(`/api/books/library/${id}`);
    if (!response.ok) {
        throw new Error('Something were wrong');
    }
    const data = await response.json();
    return data;
};

export const fetchAvailableBooks = async (id) => {
    const response = await fetch(`/api/books/library/${id}/available`);
    if (!response.ok) {
        throw new Error('Something were wrong');
    }
    const data = await response.json();
    return data;
};

export const fetchAvailableStudents = async (id) => {
    const response = await fetch(`/api/students/library/${id}/available`);
    if (!response.ok) {
        throw new Error('Something were wrong');
    }
    const data = await response.json();
    return data;
};

export const createNewObject = async (type, objData) => {
    const response = await fetch(`/api/${type}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objData)
    });
    if (!response.ok) {
        throw new Error('Something were wrong');
    }
    const data = await response.json();
    return data;
};

export const deleteObject = async (type, itemId) => {
    const response = await fetch(`/api/${type}/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error('Something were wrong');
    }
    const data = await response.json();
    return data;
};

export const updateObject = async (type, id, itemData) => {
    const response = await fetch(`/api/${type}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemData)
    });
    if (!response.ok) {
        throw new Error('Something were wrong');
    }
    const data = await response.json();
    return data;
};

export const borrowBook = async (id, studentId) => {
    const response = await fetch(`/api/books/${id}/borrow-book`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ studentId: studentId })
    });
    if (!response.ok) {
        throw new Error('Something were wrong');
    }
    const data = await response.json();
    return data;
};

export const returnBook = async (id) => {
    const response = await fetch(`/api/books/${id}/return-book`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Something were wrong');
    }
    const data = await response.json();
    return data;
};



