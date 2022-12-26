import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import CardTile from "../components/CardTile";

const Dashboard = () => {
    const [studySets, setStudySets] = useState([])
    const studySetsCollectionRef = collection(db, "studysets")

    useEffect(() => {
        async function getStudySets() {
            const data = await getDocs(studySetsCollectionRef)
            setStudySets(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }

        getStudySets()
    }, [])

    return (
        <>
            <h1>All 🅱️uizlets</h1>
            {studySets.map((set) => <CardTile title={set.title} id={set.id}/>)}
        </>
    )
}

export default Dashboard;