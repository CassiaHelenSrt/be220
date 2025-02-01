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
      const querySnapshot = await getDocs(
        collection(this.db, 'personalOnline')
      );

      const data: PersonalOnline[] = [];

      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as PersonalOnline);
      });

      this.personalOnline = data.sort((a: PersonalOnline, b: PersonalOnline) =>
        a.id.localeCompare(b.id)
      );

      console.log(this.personalOnline);
    } catch (error) {
      console.error('Erro ao buscar dados: ', error);
    }
  }

  // Função para atualizar dados
  async updateData(docId: string, updatedData: any) {
    try {
      // Obter a referência do documento
      const docRef = doc(this.db, 'planos', docId); // 'users' é a coleção, docId é o ID do documento a ser atualizado

      // Atualizando os campos no documento
      await updateDoc(docRef, updatedData);

      console.log('Documento atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar documento: ', error);
    }
  }
}
