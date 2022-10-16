import React from "react";
const Table = (props) => {
    return (
        <>
            <div className="table-div">
                <table className="table">
                    <thead className="t-head">
                        <tr>
                            {props.fields.map((field) => (
                                <th key={field} scope="col" className="py-3 px-6">
                                    {field}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((zaznam) => {
                            return (
                                <tr key={zaznam._id} className="t-row">
                                    {
                                        Object.keys(zaznam).map((item) => {
                                            if (item.includes("hidden")) {
                                                return <React.Fragment key={item}></React.Fragment>;
                                            }
                                            return (
                                                <td key={item} className={`py-4 px-6 ${zaznam.hiddenClasses} bg-opacity-30`}>
                                                    {zaznam[item]}
                                                </td>);
                                        })
                                    }
                                    <td className={`py-4 px-6 ${zaznam.hiddenClasses} bg-opacity-30`}>
                                        {props.actions.map((item) => {
                                            if (zaznam.borrowed && zaznam.borrowed !== '-' && item.text === 'Požičať') {
                                                return <React.Fragment key={item}></React.Fragment>
                                            }
                                            if (zaznam.borrowed && zaznam.borrowed === '-' && item.text === 'Vrátiť') {
                                                return <React.Fragment key={item}></React.Fragment>
                                            }
                                            return (
                                                <button key={item.text} onClick={() => item.onClick(zaznam)} className={`t-action ${item.hiddenClasses}`}>{item.text}</button>
                                            )
                                        })}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {props.data.length === 0 && <p className="no-results">Neboli nájdené žiadne údaje</p>}
        </>
    );
}
export default Table;