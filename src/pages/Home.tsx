import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const GET_USERS = `
query {
  users: allUsers {
    id
    name
  }
}
`

const Home: React.FC = () => {

  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    fetch (
      `http://localhost:3000/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: GET_USERS,
          // variables: {

          // }
        })
      }
    )
      .then(data => data.json())
      .then(response => {
        setUsers(response.data.users)
      })
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          { users.map((user, index) => <IonItem key={index}>{user.name}</IonItem> )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
