import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import CardTile from "../components/CardTile";
import { Container } from "react-bootstrap";

const Dashboard = () => {
    const [studySets, setStudySets] = useState([])
    const studySetsCollectionRef = collection(db, "studysets")

    useEffect(() => {
        async function getStudySets() {
            const data = await getDocs(studySetsCollectionRef)
            console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            setStudySets(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }

        getStudySets()
    }, [])

    return (
        <Container>
            <h1 className="mt-5">Browse 🅱️uizlets</h1>
            {studySets.map((set) => <CardTile title={set.title} id={set.id} description={set.description} author={set.author.name} key={set.id}/>)}
        </Container>
    )
}

export default Dashboard;