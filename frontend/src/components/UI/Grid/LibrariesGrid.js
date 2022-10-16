import GridLayout from "./GridLayout";
import GridItem from "./GridItem";
import { Link } from "react-router-dom";
import { TYPES_RESORUCES } from "../../../data/data";

const LibrariesGrid = (props) => {
    return(
        <GridLayout>
            {props.data.map((item) => (
                <GridItem key={item._id}>
                    <Link className="grid-link" to={`${TYPES_RESORUCES.LIBRARIES}/${item._id}`}><h3>{item.title}</h3></Link>
                </GridItem>
            ))}
        </GridLayout>
    )
}

export default LibrariesGrid;