export interface WritingTask {
  id: string;
  part: "Task 1" | "Task 2";
  prompt: string;
  promptRu: string;
  minWords: number;
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
      "You recently stayed at a hotel and were not satisfied with the service. Write a letter to the hotel manager. In your letter: explain why you were staying at the hotel, describe the problems you experienced, and say what action you would like the manager to take. Begin your letter with 'Dear Sir or Madam,'. You do NOT need to write any addresses.",
    promptRu:
      "Вы недавно останавливались в отели и остались недовольны сервисом. Напишите письмо менеджеру отеля: объясните, почему вы там жили, опишите возникшие проблемы и скажите, каких действий ожидаете. Начните письмо с 'Dear Sir or Madam,'. Адреса писать не нужно.",
    minWords: 150,
  },
  {
    id: "w2",
    part: "Task 2",
    prompt:
      "Some people think that universities should provide graduates with the knowledge and skills needed in the workplace. Others think that the true function of a university should be to give access to knowledge for its own sake. What is your opinion?",
    promptRu:
      "Одни считают, что университеты должны давать знания и навыки для работы. Другие — что их роль в знаниях ради знаний. Ваше мнение?",
    minWords: 250,
  },
  {
    id: "w3",
    part: "Task 2",
    prompt:
      "In many countries, traditional foods are being replaced by international fast foods. This is having a negative effect on both families and societies. To what extent do you agree or disagree?",
    promptRu:
      "Во многих странах традиционная еда уступает место международному фастфуду. Это негативно влияет на семьи и общество. Согласны ли вы?",
    minWords: 250,
  },
  {
    id: "w4",
    part: "Task 2",
    prompt:
      "Some people believe that to give opportunities to the new generation, companies should encourage high level employees who are older than 55 to retire. Do you agree or disagree?",
    promptRu:
      "Некоторые считают, что компаниям следует поощрять уход на пенсию сотрудников старше 55 лет, чтобы дать дорогу новому поколению. Согласны ли вы?",
    minWords: 250,
  },
  {
    id: "w5",
    part: "Task 2",
    prompt: "Some people believe working from home should become the new normal after the pandemic. To what extent do you agree or disagree?",
    promptRu: "Некоторые считают, что работа из дома должна стать новой нормой после пандемии. В какой степени вы согласны или не согласны с этим?",
    minWords: 250,
  },
  {
    id: "w6",
    part: "Task 2",
    prompt: "In many countries, parents put a lot of pressure on children to succeed academically. Is this a positive or negative development?",
    promptRu: "Во многих странах родители оказывают сильное давление на детей, чтобы те добились успехов в учебе. Является ли это положительным или отрицательным фактором?",
    minWords: 250,
  },
  {
    id: "w7",
    part: "Task 2",
    prompt: "Governments should invest more in public transport to reduce pollution and traffic. To what extent do you agree or disagree?",
    promptRu: "Правительствам следует больше инвестировать в общественный транспорт, чтобы снизить уровень загрязнения окружающей среды и пробки. В какой степени вы согласны или не согласны?",
    minWords: 250,
  },
  {
    id: "w8",
    part: "Task 2",
    prompt: "Some people think advertising encourages unnecessary spending. Others believe it improves the standard of living. Discuss both views and give your opinion.",
    promptRu: "Некоторые считают, что реклама побуждает людей совершать ненужные покупки. Другие полагают, что она повышает уровень жизни. Обсудите обе точки зрения и выскажите свое мнение.",
    minWords: 250,
  },
  {
    id: "w9",
    part: "Task 2",
    prompt: "International tourism can harm local culture and traditions. Do the advantages outweigh the disadvantages?",
    promptRu: "Международный туризм может нанести вред местной культуре и традициям. Перевешивают ли преимущества его недостатки?",
    minWords: 250,
  },
  {
    id: "w10",
    part: "Task 2",
    prompt: "Cities should provide more green spaces such as parks and gardens. Why is this important, and how can it be achieved?",
    promptRu: "В города должно быть больше зеленых зон, таких как парки и сады. Почему это важно и как этого можно достичь?",
    minWords: 250,
  },
  {
    id: "w11",
    part: "Task 2",
    prompt: "Some people think that all students should learn English, while others believe schools should focus on local languages. Discuss both views and give your opinion.",
    promptRu: "Некоторые считают, что все ученики должны учить английский язык, в то время как другие думают, что школы должны сосредоточиться на местных языках. Обсудите обе точки зрения и выскажите свое мнение.",
    minWords: 250,
  },
  {
    id: "w12",
    part: "Task 2",
    prompt: "Governments should spend more on preventing illness than on treating it. To what extent do you agree or disagree?",
    promptRu: "Правительства должны тратить больше средств на профилактику заболеваний, чем на их лечение. В какой степени вы согласны или не согласны?",
    minWords: 250,
  },
  {
    id: "w13",
    part: "Task 2",
    prompt: "Online education is becoming more popular. Do the advantages of online learning outweigh the disadvantages?",
    promptRu: "Онлайн-обучение становится все более популярным. Перевешивают ли преимущества онлайн-обучения его недостатки?",
    minWords: 250,
  },
  {
    id: "w14",
    part: "Task 2",
    prompt: "Many countries rely on imported food. Is this a positive or negative development?",
    promptRu: "Многие страны зависят от импорта продуктов питания. Является ли это положительным или отрицательным явлением?",
    minWords: 250,
  },
  {
    id: "w15",
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
    id: "s5",
    part: "Part 3",
    prompt:
      "How has technology changed the way people communicate compared to twenty years ago?",
    promptRu:
      "Как технологии изменили общение людей по сравнению с тем, что было двадцать лет назад?",
  },
  {
    id: "s6",
    part: "Part 1",
    prompt: "Let's talk about public transport. How often do you use public transport in your town?",
    promptRu: "Давайте поговорить об общественном транспорте. Как часто вы пользуетесь общественным транспортом в своем городе?",
  },
  {
    id: "s7",
    part: "Part 1",
    prompt: "Let's talk about wild animals. Are there many wild animals in your country?",
    promptRu: "Давайте поговорим о диких животных. Много ли диких животных в вашей стране?",
  },
  {
    id: "s8",
    part: "Part 2",
    prompt: "Describe a book that you have read recently and found useful. You should say: what book it is, who wrote it, what it is about, and explain why you found it useful.",
    promptRu: "Опишите книгу, которую вы недавно прочитали и сочли полезной: что за книга, кто ее написал, о чем она и почему она показалась вам полезной.",
  },
  {
    id: "s9",
    part: "Part 2",
    prompt: "Describe a beautiful city you visited. You should say: where it is, when you went there, what you did there, and explain why you think it is beautiful.",
    promptRu: "Опишите красивый город, который вы посетили: где он находится, когда вы там были, что делали и почему считаете его красивым.",
  },
  {
    id: "s10",
    part: "Part 3",
    prompt: "How does tourism affect historical sites and local culture in a city?",
    promptRu: "Как туризм влияет на исторические места и местную культуру в городе?",
  },
  {
    id: "s11",
    part: "Part 3",
    prompt: "In what ways do you think online reading is different from reading printed books?",
    promptRu: "Как вы думаете, чем чтение в интернете отличается от чтения печатных книг?",
  },
];
