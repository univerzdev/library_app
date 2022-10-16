import { useNavigate, useParams } from "react-router-dom";

import { TABLE_BOOKS_HISTORY_FIELDS, TYPES_RESORUCES } from "../data/data";
import { fetchSingleItem } from "../API/apiCalls";

import Table from "../components/UI/Table";
import { useEffect, useState } from "react";
import { dateFormatSK, endDateFormatSK } from "../data/helpers";

const StudentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const student = await fetchSingleItem(TYPES_RESORUCES.STUDENTS, id);
            if(student){
                setStudent(student);
            }
        }
        fetchData();
    }, [id]);
    const BOOKS_TABLE_ACTIONS = [];
    let filteredBooks = [];
    if (student) {
        student.borrowedBooks.forEach(item => {
            let { title, isbn, year } = item.book;
            const { _id, time } = item;
            filteredBooks.push({
                _id,
                title,
                year,
                isbn,
                time: dateFormatSK(time),
                timeTo: endDateFormatSK(time)
            })
        });
    }

    return (
        <>
            {student &&
                <div className="my-container">
                    <button className="btn-back" onClick={() => navigate(-1)}>BACK</button>
                    <h1 className="headline-1">{student.name}</h1>
                    <h2 className="headline-2">HISTÓRIA POŽICANÝCH KNÍH</h2>
                    <Table fields={TABLE_BOOKS_HISTORY_FIELDS} data={filteredBooks} actions={BOOKS_TABLE_ACTIONS} />
                </div>}

        </>
    );
}

export default StudentDetail;