export interface WritingTask {
  id: string;
  part: "Task 1" | "Task 2";
  prompt: string;
  promptRu: string;
  minWords: number;
  imageUrl?: string;
}

export interface SpeakingTask {
  id: string;
  part: "Part 1" | "Part 2" | "Part 3";
  prompt: string;
  promptRu: string;
}

export const writingTasks: WritingTask[] = [
  {
    id: "w1",
    part: "Task 1",
    prompt:
      "The table below provides information on marriage status and age from 1960 to 2000 in Australia. Summarize the information on marriage status and age from 1960 to 2000 in Australia.",
    promptRu:
      "В таблице ниже представлена информация о семейном положении и возрасте в Австралии с 1960 по 2000 год. Обобщите информацию о семейном положении и возрасте в Австралии с 1960 по 2000 год.",
    minWords: 150,
    imageUrl: "/images/photo_2026-06-23_13-02-10.jpg",
  },
  {
    id: "w2",
    part: "Task 1",
    prompt:
      "The graph below shows the percentage of Australian exports to four countries from 1990 to 2012.",
    promptRu:
      "На графике ниже показан процент австралийского экспорта в четыре страны с 1990 по 2012 год.",
    minWords: 150,
    imageUrl: "/images/photo_2026-06-23_13-02-11.jpg",
  },
  {
    id: "w3",
    part: "Task 1",
    prompt:
      "The chart below shows the amount of money in billions of dollars spent on international tourism by people from seven different countries in 2011 and 2012.",
    promptRu:
      "На диаграмме ниже показана сумма денег в миллиардах долларов, потраченных на международный туризм жителями семи разных стран в 2011 и 2012 годах.",
    minWords: 150,
    imageUrl: "/images/photo_2026-06-23_13-02-12.jpg",
  },
  {
    id: "w4",
    part: "Task 1",
    prompt:
      "The table shows information about students studying at an Australian university in 2009.",
    promptRu:
      "В таблице показана информация о студентах, обучающихся в австралийском университете в 2009 году.",
    minWords: 150,
    imageUrl: "/images/photo_2026-06-23_13-02-13.jpg",
  },
  {
    id: "w5",
    part: "Task 1",
    prompt:
      "The pie charts show different kinds of energy sources in a particular country in 1985, 1995 and 2005.",
    promptRu:
      "Круговые диаграммы показывают различные виды источников энергии в конкретной стране в 1985, 1995 и 2005 годах.",
    minWords: 150,
    imageUrl: "/images/photo_2026-06-23_13-02-14.jpg",
  },
  {
    id: "w6",
    part: "Task 1",
    prompt:
      "The process shows the design of a modern landfill for household waste.",
    promptRu:
      "Процесс показывает дизайн современной свалки для бытовых отходов.",
    minWords: 150,
    imageUrl: "/images/photo_2026-06-23_13-02-15.jpg",
  },
  {
    id: "w17",
    part: "Task 1",
    prompt:
      "The graph below shows the percentages of tourists who used different types of transport to travel within a particular nation between 1989 and 2009. Each tourist may have used more than one type of transport.",
    promptRu:
      "На графике ниже показаны проценты туристов, которые использовали разные виды транспорта для путешествий по конкретной стране с 1989 по 2009 год. Каждый турист мог использовать более одного вида транспорта.",
    minWords: 150,
    imageUrl: "/images/photo_2026-06-23_13-02-16.jpg",
  },
  {
    id: "w18",
    part: "Task 1",
    prompt:
      "The maps below show a beachfront area in Australia in 1950 and the same today.",
    promptRu:
      "Карты ниже показывают прибрежную зону в Австралии в 1950 году и в настоящее время.",
    minWords: 150,
    imageUrl: "/images/photo_2026-06-23_13-02-17.jpg",
  },
  {
    id: "w19",
    part: "Task 1",
    prompt:
      "The table gives information about the number of international tourist arrivals (millions) in 9 countries in 2009 and 2010.",
    promptRu:
      "В таблице представлена информация о количестве прибытий международных туристов (в миллионах) в 9 странах в 2009 и 2010 годах.",
    minWords: 150,
    imageUrl: "/images/photo_2026-06-23_13-02-18.jpg",
  },
  {
    id: "w20",
    part: "Task 1",
    prompt:
      "The plan below show a school in 1985 and the school now.",
    promptRu:
      "План ниже показывает школу в 1985 году и школу в настоящее время.",
    minWords: 150,
    imageUrl: "/images/photo_2026-06-23_13-02-19.jpg",
  },
  {
    id: "w21",
    part: "Task 1",
    prompt:
      "The map shows the development of an area between 1995 and present.",
    promptRu:
      "Карта показывает развитие района с 1995 года по настоящее время.",
    minWords: 150,
    imageUrl: "/images/photo_2026-06-23_13-02-20.jpg",
  },
  {
    id: "w22",
    part: "Task 1",
    prompt:
      "The charts below show the number of tourists to Australia from three countries in 1995 and 2005, and the types of travels between 1995 and 2005.",
    promptRu:
      "Диаграммы ниже показывают количество туристов в Австралию из трех стран в 1995 и 2005 годах, а также типы путешествий между 1995 и 2005 годами.",
    minWords: 150,
    imageUrl: "/images/photo_2026-06-23_13-02-21.jpg",
  },
  {
    id: "w23",
    part: "Task 1",
    prompt:
      "The line graph below shows the number of international conferences in three cities between 1965 and 2010.",
    promptRu:
      "Линейный график ниже показывает количество международных конференций в трех городах с 1965 по 2010 год.",
    minWords: 150,
    imageUrl: "/images/photo_2026-06-23_13-02-22.jpg",
  },
  {
    id: "w24",
    part: "Task 1",
    prompt:
      "The graph below shows the percentage of total spending in five different categories from 1970 to 2010 in one city in Australia.",
    promptRu:
      "График ниже показывает процент общих расходов по пяти различным категориям с 1970 по 2010 год в одном городе Австралии.",
    minWords: 150,
    imageUrl: "/images/photo_2026-06-23_13-02-23.jpg",
  },
  {
    id: "w7",
    part: "Task 2",
    prompt:
      "Some people think that universities should provide graduates with the knowledge and skills needed in the workplace. Others think that the true function of a university should be to give access to knowledge for its own sake. What is your opinion?",
    promptRu:
      "Одни считают, что университеты должны давать знания и навыки для работы. Другие — что их роль в знаниях ради знаний. Ваше мнение?",
    minWords: 250,
  },
  {
    id: "w7",
    part: "Task 2",
    prompt:
      "In many countries, traditional foods are being replaced by international fast foods. This is having a negative effect on both families and societies. To what extent do you agree or disagree?",
    promptRu:
      "Во многих странах традиционная еда уступает место международному фастфуду. Это негативно влияет на семьи и общество. Согласны ли вы?",
    minWords: 250,
  },
  {
    id: "w8",
    part: "Task 2",
    prompt:
      "Some people believe that to give opportunities to the new generation, companies should encourage high level employees who are older than 55 to retire. Do you agree or disagree?",
    promptRu:
      "Некоторые считают, что компаниям следует поощрять уход на пенсию сотрудников старше 55 лет, чтобы дать дорогу новому поколению. Согласны ли вы?",
    minWords: 250,
  },
  {
    id: "w9",
    part: "Task 2",
    prompt: "Some people believe working from home should become the new normal after the pandemic. To what extent do you agree or disagree?",
    promptRu: "Некоторые считают, что работа из дома должна стать новой нормой после пандемии. В какой степени вы согласны или не согласны с этим?",
    minWords: 250,
  },
  {
    id: "w10",
    part: "Task 2",
    prompt: "In many countries, parents put a lot of pressure on children to succeed academically. Is this a positive or negative development?",
    promptRu: "Во многих странах родители оказывают сильное давление на детей, чтобы те добились успехов в учебе. Является ли это положительным или отрицательным фактором?",
    minWords: 250,
  },
  {
    id: "w11",
    part: "Task 2",
    prompt: "Governments should invest more in public transport to reduce pollution and traffic. To what extent do you agree or disagree?",
    promptRu: "Правительствам следует больше инвестировать в общественный транспорт, чтобы снизить уровень загрязнения окружающей среды и пробки. В какой степени вы согласны или не согласны?",
    minWords: 250,
  },
  {
    id: "w12",
    part: "Task 2",
    prompt: "Some people think advertising encourages unnecessary spending. Others believe it improves the standard of living. Discuss both views and give your opinion.",
    promptRu: "Некоторые считают, что реклама побуждает людей совершать ненужные покупки. Другие полагают, что она повышает уровень жизни. Обсудите обе точки зрения и выскажите свое мнение.",
    minWords: 250,
  },
  {
    id: "w13",
    part: "Task 2",
    prompt: "International tourism can harm local culture and traditions. Do the advantages outweigh the disadvantages?",
    promptRu: "Международный туризм может нанести вред местной культуре и традициям. Перевешивают ли преимущества его недостатки?",
    minWords: 250,
  },
  {
    id: "w14",
    part: "Task 2",
    prompt: "Cities should provide more green spaces such as parks and gardens. Why is this important, and how can it be achieved?",
    promptRu: "В города должно быть больше зеленых зон, таких как парки и сады. Почему это важно и как этого можно достичь?",
    minWords: 250,
  },
  {
    id: "w15",
    part: "Task 2",
    prompt: "Some people think that all students should learn English, while others believe schools should focus on local languages. Discuss both views and give your opinion.",
    promptRu: "Некоторые считают, что все ученики должны учить английский язык, в то время как другие думают, что школы должны сосредоточиться на местных языках. Обсудите обе точки зрения и выскажите свое мнение.",
    minWords: 250,
  },
  {
    id: "w16",
    part: "Task 2",
    prompt: "Governments should spend more on preventing illness than on treating it. To what extent do you agree or disagree?",
    promptRu: "Правительства должны тратить больше средств на профилактику заболеваний, чем на их лечение. В какой степени вы согласны или не согласны?",
    minWords: 250,
  },
  {
    id: "w17",
    part: "Task 2",
    prompt: "Online education is becoming more popular. Do the advantages of online learning outweigh the disadvantages?",
    promptRu: "Онлайн-обучение становится все более популярным. Перевешивают ли преимущества онлайн-обучения его недостатки?",
    minWords: 250,
  },
  {
    id: "w18",
    part: "Task 2",
    prompt: "Many countries rely on imported food. Is this a positive or negative development?",
    promptRu: "Многие страны зависят от импорта продуктов питания. Является ли это положительным или отрицательным явлением?",
    minWords: 250,
  },
  {
    id: "w19",
    part: "Task 2",
    prompt: "Artificial intelligence is increasingly used in education. Discuss the benefits and drawbacks, and give your opinion.",
    promptRu: "Искусственный интеллект все чаще используется в образовании. Обсудите преимущества и недостатки и выскажите свое мнение.",
    minWords: 250,
  },
];

export const speakingTasks: SpeakingTask[] = [
  {
    id: "s1",
    part: "Part 1",
    prompt: "Let's talk about your hometown. Where is it, and what is it known for?",
    promptRu: "Расскажите о вашем родном городе. Где он, чем известен?",
  },
  {
    id: "s2",
    part: "Part 1",
    prompt: "Do you enjoy reading books? What kind of books do you like and why?",
    promptRu: "Любите ли вы читать? Какие книги предпочитаете и почему?",
  },
  {
    id: "s7",
    part: "Part 1",
    prompt: "Do you like modern art or traditional art?",
    promptRu: "Вам больше нравится современное или традиционное искусство?",
  },
  {
    id: "s8",
    part: "Part 1",
    prompt: "Do you think history is important?",
    promptRu: "Считаете ли вы, что история важна?",
  },
  {
    id: "s13",
    part: "Part 1",
    prompt: "What kinds of websites do you often visit?",
    promptRu: "Какие сайты вы часто посещаете?",
  },
  {
    id: "s14",
    part: "Part 1",
    prompt: "Would you like to be a teacher?",
    promptRu: "Хотели бы вы стать учителем?",
  },
  {
    id: "s3",
    part: "Part 2",
    prompt:
      "Describe a skill you would like to learn. You should say: what the skill is, how you would learn it, how long it would take, and explain why you want to learn this skill.",
    promptRu:
      "Опишите навык, который хотите освоить: что это, как будете учиться, сколько времени займёт и почему именно этот навык.",
  },
  {
    id: "s4",
    part: "Part 2",
    prompt:
      "Describe a memorable journey you have taken. You should say: where you went, who you went with, what you did, and explain why it was memorable.",
    promptRu:
      "Опишите запоминающееся путешествие: куда, с кем, что делали и почему запомнилось.",
  },
  {
    id: "s9",
    part: "Part 2",
    prompt:
      "Describe a friend from your childhood. You should say: who this person was, how you met, what you used to do together, and explain why you remember this friend.",
    promptRu:
      "Опишите друга из детства: кто это был, как познакомились, чем занимались вместе и почему вы его помните.",
  },
  {
    id: "s10",
    part: "Part 2",
    prompt:
      "Describe a film you watched and enjoyed. You should say: what the film was, when and where you watched it, what it was about, and explain why you enjoyed it.",
    promptRu:
      "Опишите фильм, который вы смотрели и который вам понравился: какой это был фильм, когда и где вы его смотрели, о чём он и почему вам понравился.",
  },
  {
    id: "s15",
    part: "Part 2",
    prompt:
      "Describe a boring place. You should say: where it is, when you went there, what you did there, and explain why you found it boring.",
    promptRu:
      "Опишите скучное место: где оно находится, когда вы там были, что там делали и почему вам там было скучно.",
  },
  {
    id: "s16",
    part: "Part 2",
    prompt:
      "Describe an interesting video. You should say: what the video was about, when and where you watched it, who you watched it with, and explain why you found it interesting.",
    promptRu:
      "Опишите интересное видео: о чём оно было, когда и где вы его смотрели, с кем смотрели и почему оно показалось вам интересным.",
  },
  {
    id: "s5",
    part: "Part 3",
    prompt:
      "How has technology changed the way people communicate compared to twenty years ago?",
    promptRu:
      "Как технологии изменили способы общения людей по сравнению с двадцатью годами назад?",
  },
  {
    id: "s6",
    part: "Part 3",
    prompt:
      "What are the advantages and disadvantages of living in a large city compared to a small town?",
    promptRu:
      "Какие преимущества и недостатки жизни в большом городе по сравнению с маленьким городом?",
  },
  {
    id: "s11",
    part: "Part 3",
    prompt: "How can rivers and lakes benefit local people?",
    promptRu: "Как реки и озёра могут приносить пользу местным жителям?",
  },
  {
    id: "s12",
    part: "Part 3",
    prompt: "Do you still keep in touch with your friends from childhood?",
    promptRu: "Вы до сих пор поддерживаете связь с друзьями из детства?",
  },
  {
    id: "s17",
    part: "Part 3",
    prompt: "Why do some people prefer to travel in their own country rather than going abroad?",
    promptRu: "Почему некоторые люди предпочитают путешествовать по своей стране, а не за границу?",
  },
  {
    id: "s18",
    part: "Part 3",
    prompt: "How would you tell your friends if you had to change your plans?",
    promptRu: "Как бы вы сообщили друзьям, если бы вам пришлось изменить планы?",
  },
];
