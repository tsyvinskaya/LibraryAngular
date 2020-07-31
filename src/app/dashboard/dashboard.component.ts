import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  books: Book[] = [];
  covers: string[] = ['https://cdn.eksmo.ru/v2/430000000000145724/COVER/cover1__w600.jpg', "https://static.librebook.me/uploads/pics/01/71/609.jpg", "https://cdn.eksmo.ru/v2/ITD000000000307388/COVER/cover1__w600.jpg", "https://book-cover.ru/sites/default/files/styles/osn_530x/public/field/image/lermontov-geroj-nashego-vremeni-ita.jpg?itok=kXBgtOQY", "https://omiliya.org/sites/default/files/styles/large/public/img_articles/mertvye_dushi_risovannaya_gogolem_0.jpg?itok=3XZnLsIj", "https://st.rolld.ru/i/thumbnails/sherlok-kholms-i-plyashushie-chelovechki-2019-12-08.jpeg"]
  AuthorsPhoto: string[] = ["https://cdnimg.rg.ru/i/gallery/eefb89fc/1_a4e5bb9c.jpg", "https://24smi.org/public/media/celebrity/2017/02/10/kRe3n0JxVhm4_anton-chekhov.jpg", "https://cdn-s-static.arzamas.academy/storage/special/ruslit/writer/15/photo-6bc07f4e-4ea4-40c3-a08f-48610c82327e.jpg", "https://24smi.org/public/media/celebrity/2017/06/06/Pp0ZbJmMwa9N_mikhail-lermontov.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/N.Gogol_by_A.Ivanov_%281841%2C_Russian_museum%29_2.jpg/220px-N.Gogol_by_A.Ivanov_%281841%2C_Russian_museum%29_2.jpg", "https://data.fantlab.ru/images/autors/939"]
  decsriptions: string[] = [`Одно из самых значительных произведений в истории мировой литературы. Это и глубокий философский роман, и
  тонкая психологическая драма, и захватывающий детектив, и величественная картина мрачного города, в недрах
  которого герои грешат и ищут прощения, жертвуют собой и отрекаются от себя ради ближних и находят успокоение в
  смирении, покаянии, вере.`, `Combining psychological detail with a strong sense of place and time, this tale bears all the hallmarks of Chekhov's genius, and perfectly captures the political and social tensions of its day.`, `"Отцы и дети" (1862) - этапный, знаковый, культовый роман для своего времени. Но по мере смены исторических эпох он никак не теряет своей актуальности.`, `В романе Лермонтова соединены пять историй о молодом человеке, которого автор назвал "героем нашего времени". С выхода романа в свет (1840) не прекращаются споры о том, иронично или серьезно заглавие?`, `Поэма "Мертвые души" не теряет своего значения и сейчас - настолько емкими оказались портреты гоголевских помещиков, настолько точно автор угадал русские характеры и настолько широко охватил он российскую действительность.`, `"Пляшущие человечки" - захватывающий рассказ Артура Конан Дойла из цикла "Приключения Шерлока Холмса", выпущенного в 1892 году. Знаменитый сыщик сталкивается с загадкой, слишком таинственной даже для него…`]

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books.slice(0, 6));
  }

}
