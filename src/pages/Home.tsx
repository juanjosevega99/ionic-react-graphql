import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonAvatar, IonLabel } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const GET_USERS_ORDER = `
query myQuery($orderId: ID!) {
  users: allUsers {
    id
    name
  }
  order(id: $orderId) {
    id
    createDateTime
  }
}
`

const Home: React.FC = () => {

  const [users, setUsers] = useState<any[]>([])
  const [order, setOrder] = useState<any>({})

  useEffect(() => {
    fetch (
      `http://localhost:3000/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: GET_USERS_ORDER,
          variables: {
            orderId: 'xdxd'
          }
        })
      }
    )
      .then(data => data.json())
      .then(response => {
        setUsers(response.data.users)
        setOrder(response.data.order)
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
      <IonItem>
        <IonAvatar slot="start">
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==" />
        </IonAvatar>
        <IonLabel>
          {order.id}
        </IonLabel>
      </IonItem>
        <IonList>
          { users.map((user, index) => <IonItem key={index}>{user.name}</IonItem> )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
