import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonalOnline } from '../models/personalOnline.model';
import { Programs } from '../models/pograms.model';
import { Content } from '../models/content.model';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  logoYoutube,
  man,
  menu,
  notifications,
  trophy,
} from 'ionicons/icons';
import {
  collection,
  getDocs,
  Firestore,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class DashboardPage implements OnInit {
  public personalOnline: PersonalOnline[] = [];

  public programs: Programs[] = [
    {
      id: 1,
      title: 'Continuar Treinando',
      description: 'Levantamento de peso',
      image: 'assets/imgs/academy.jpg',
      icon: 'add-circle-outline',
    },
    {
      id: 2,
      title: 'Treino de Força',
      description: 'Ganhe músculos e resistência!',
      image: 'assets/imgs/academy.jpg',
      icon: '',
    },
    {
      id: 3,
      title: 'Treino de Yoga',
      description: 'Melhore sua flexibilidade e relaxe!',
      image: 'assets/imgs/academy.jpg',
      icon: '',
    },
  ];

  public content: Content[] = [
    {
      id: 1,
      image: 'assets/imgs/academy.jpg',
      icon: 'add-circle-outline',
    },
    {
      id: 2,
      image: 'assets/imgs/academy.jpg',
      icon: '',
    },
    {
      id: 3,
      image: 'assets/imgs/academy.jpg',
      icon: '',
    },
  ];

  private db: Firestore;

  constructor() {
    addIcons({
      menu,
      notifications,
      man,
      trophy,
      addCircleOutline,
      logoYoutube,
    });

    initializeApp(environment.firebaseConfig);
    this.db = getFirestore();
  }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    try {
      // Acessando a coleção 'personalOnline' no Firestore
      const querySnapshot = await getDocs(
        collection(this.db, 'personalOnline')
      );

      // Criando uma lista para armazenar os dados
      const data: any = [];

      // Adicionando os dados de cada documento na lista
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      // Ordenando os dados pelo id (ordem lexicográfica)
      this.personalOnline = data.sort((a: any, b: any) =>
        a.id.localeCompare(b.id)
      );

      console.log(this.personalOnline);
    } catch (error) {
      console.error('Erro ao buscar dados: ', error);
    }
  }
}
