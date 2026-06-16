export interface CambridgeTestSection {
  readingTopic: string;
  listeningTopic: string;
  writingTask1: {
    prompt: string;
    promptRu: string;
  };
  writingTask2: {
    prompt: string;
    promptRu: string;
  };
  speakingPart1: {
    prompt: string;
    promptRu: string;
  };
  speakingPart2: {
    prompt: string;
    promptRu: string;
  };
  speakingPart3: {
    prompt: string;
    promptRu: string;
  };
}

export interface CambridgeTest {
  testId: string; // "1" | "2" | "3" | "4"
  title: string;
  sections: CambridgeTestSection;
}

export interface CambridgeBook {
  bookId: string; // "10" | "11" | ... | "20"
  title: string;
  tests: CambridgeTest[];
}

export const cambridgeBooks: CambridgeBook[] = [
  {
    bookId: "20",
    title: "Cambridge IELTS 20",
    tests: [
      {
        testId: "1",
        title: "Test 1",
        sections: {
          readingTopic: "The impact of climate change on high-altitude alpine vegetation",
          listeningTopic: "Tour booking and registration at a city science museum",
          writingTask1: {
            prompt: "The chart below shows the percentage of households with access to the internet in different countries between 2018 and 2024. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
            promptRu: "На графике ниже показан процент домохозяйств с доступом к интернету в разных странах в период с 2018 по 2024 год. Опишите основную информацию, выделив ключевые особенности, и сделайте сравнения, где это необходимо."
          },
          writingTask2: {
            prompt: "Some people argue that large companies should pay higher taxes because they use public infrastructure. Others believe low corporate taxes encourage economic growth. Discuss both views and give your opinion.",
            promptRu: "Некоторые утверждают, что крупные компании должны платить более высокие налоги, так как они пользуются общественной инфраструктурой. Другие считают, что низкие налоги для корпораций стимулируют экономический рост. Обсудите обе точки зрения и выскажите свое мнение."
          },
          speakingPart1: {
            prompt: "Let's talk about cities. Do you prefer living in a big city or a small town, and why? What is your favorite city to visit?",
            promptRu: "Давайте поговорим о городах. Где вы предпочитаете жить: в большом городе или маленьком городке, и почему? Какой ваш любимый город для поездок?"
          },
          speakingPart2: {
            prompt: "Describe a time when you had to wait in a long queue. You should say: where you were, why you had to wait, how long you waited, and explain how you felt about it.",
            promptRu: "Опишите случай, когда вам пришлось стоять в длинной очереди. Укажите: где вы были, почему пришлось ждать, как долго вы ждали, и объясните, что вы при этом чувствовали."
          },
          speakingPart3: {
            prompt: "Do you think people today are less patient than in the past? In what ways does technology make us expect instant results in daily life?",
            promptRu: "Как вы думаете, люди сегодня менее терпеливы, чем в прошлом? Каким образом технологии заставляют нас ожидать мгновенных результатов в повседневной жизни?"
          }
        }
      },
      {
        testId: "2",
        title: "Test 2",
        sections: {
          readingTopic: "The history and development of urban planning in ancient civilizations",
          listeningTopic: "A conversation about renting an apartment and flat induction details",
          writingTask1: {
            prompt: "The table below details the number of tourists visiting a specific island before and after the construction of new holiday facilities. Summarise the information.",
            promptRu: "В таблице ниже приведена информация о числе туристов, посетивших остров до и после строительства новых туристических объектов. Опишите данные."
          },
          writingTask2: {
            prompt: "Governments should allocate more resources to teaching arts and music in schools. To what extent do you agree or disagree with this statement?",
            promptRu: "Правительства должны выделять больше ресурсов на преподавание искусства и музыки в школах. В какой степени вы согласны или не согласны с этим утверждением?"
          },
          speakingPart1: {
            prompt: "Let's talk about sports and exercise. What sports do you enjoy watching or playing? How often do you exercise?",
            promptRu: "Давайте поговорим о спорте и физических упражнениях. Какие виды спорта вам нравится смотреть или практиковать? Как часто вы тренируетесь?"
          },
          speakingPart2: {
            prompt: "Describe a piece of technology you find difficult to live without. You should say: what it is, how often you use it, what you use it for, and explain why it is important to you.",
            promptRu: "Опишите устройство или технологию, без которой вам трудно жить. Укажите: что это, как часто вы этим пользуетесь, для чего используете и почему это так важно для вас."
          },
          speakingPart3: {
            prompt: "How has technology changed the relationship between people? Do you think online interactions can replace face-to-face communication?",
            promptRu: "Как технологии изменили отношения между людьми? Считаете ли вы, что онлайн-общение может заменить личное общение?"
          }
        }
      },
      {
        testId: "3",
        title: "Test 3",
        sections: {
          readingTopic: "The psychology of sleep and its relation to memory consolidation",
          listeningTopic: "A university lecture about the history of coffee and global trade",
          writingTask1: {
            prompt: "The diagrams show the changes that took place in a small coastal village called Shell Point between 1995 and 2025. Summarise the main features.",
            promptRu: "На схемах показаны изменения, произошедшие в небольшом прибрежном поселке Шелл-Пойнт в период с 1995 по 2025 год. Опишите основные изменения."
          },
          writingTask2: {
            prompt: "In many societies, traditional values are being lost as a result of globalization. What are the causes of this, and what can be done to preserve local cultures?",
            promptRu: "В многих обществах традиционные ценности утрачиваются в результате глобализации. Каковы причины этого процесса и что можно сделать для сохранения местной культуры?"
          },
          speakingPart1: {
            prompt: "Let's talk about food. What is your favorite meal of the day? Do you prefer eating at home or at restaurants?",
            promptRu: "Давайте поговорим о еде. Какой ваш любимый прием пищи в течение дня? Вы предпочитаете есть дома или в ресторанах?"
          },
          speakingPart2: {
            prompt: "Describe a person who has had a significant influence on your life. You should say: who this person is, how you met them, what they did, and explain why they influenced you.",
            promptRu: "Опишите человека, который оказал значительное влияние на вашу жизнь. Укажите: кто этот человек, как вы познакомились, что он сделал и объясните, почему он так повлиял на вас."
          },
          speakingPart3: {
            prompt: "What qualities make someone a good role model for young people? Should celebrities have a responsibility to act as good role models?",
            promptRu: "Какие качества делают человека хорошим примером для подражания молодежи? Должны ли знаменитости нести ответственность за то, чтобы быть хорошим примером?"
          }
        }
      },
      {
        testId: "4",
        title: "Test 4",
        sections: {
          readingTopic: "The evolution of clean renewable energy and wind turbines",
          listeningTopic: "A job interview conversation at an ecological conservation center",
          writingTask1: {
            prompt: "The bar chart below shows the average weekly spendings on food and leisure in the UK across three different years. Summarise the information.",
            promptRu: "На столбчатой диаграмме ниже показаны средние еженедельные расходы на питание и досуг в Великобритании за три разных года. Опишите данные."
          },
          writingTask2: {
            prompt: "Some people believe that museums and art galleries should focus on showcasing national history and art. Others think they should display international exhibits. Discuss both views.",
            promptRu: "Некоторые считают, что музеи и художественные галереи должны сосредоточиться на показе национальной истории и искусства. Другие думают, что им следует выставлять международные экспонаты. Обсудите обе точки зрения."
          },
          speakingPart1: {
            prompt: "Let's talk about hobbies. What do you like to do in your free time? Did you have different hobbies when you were younger?",
            promptRu: "Давайте поговорим о хобби. Чем вам нравится заниматься в свободное время? Были ли у вас другие увлечения, когда вы были моложе?"
          },
          speakingPart2: {
            prompt: "Describe a book or movie that made a strong impression on you. You should say: what it was, when you read/watched it, what it was about, and explain why it impressed you.",
            promptRu: "Опишите книгу или фильм, которые произвели на вас сильное впечатление. Укажите: что это было, когда вы это прочитали/посмотрели, о чем это было, и объясните, почему это вас так впечатлило."
          },
          speakingPart3: {
            prompt: "Why do some stories remain popular for hundreds of years? What is the value of literature and films in modern society?",
            promptRu: "Почему некоторые истории остаются популярными на протяжении сотен лет? В чем ценность литературы и кино в современном обществе?"
          }
        }
      }
    ]
  },
  {
    bookId: "19",
    title: "Cambridge IELTS 19",
    tests: [
      {
        testId: "1",
        title: "Test 1",
        sections: {
          readingTopic: "The biological mechanism of memory in marine mollusc Aplysia",
          listeningTopic: "A telephone conversation registering for an adult education course",
          writingTask1: {
            prompt: "The line graph below shows changes in the birth rates of two distinct regions from 1950 to 2020. Summarise the main trends.",
            promptRu: "На линейном графике ниже показаны изменения рождаемости в двух разных регионах с 1950 по 2020 год. Опишите основные тенденции."
          },
          writingTask2: {
            prompt: "Some people believe that teenagers should be encouraged to work part-time jobs so they can learn about financial independence. Do you agree or disagree?",
            promptRu: "Некоторые считают, что подростков нужно поощрять к работе на неполный рабочий день, чтобы они учились финансовой независимости. Согласны ли вы?"
          },
          speakingPart1: {
            prompt: "Let's talk about your studies or work. Are you studying or working right now? What do you like most about it?",
            promptRu: "Давайте поговорим о вашей учебе или работе. Вы сейчас учитесь или работаете? Что вам больше всего нравится в этом?"
          },
          speakingPart2: {
            prompt: "Describe a skill you learned successfully. You should say: what the skill is, how you learned it, how long it took, and explain how you felt after learning it.",
            promptRu: "Опишите навык, который вы успешно освоили. Укажите: что это за навык, как вы его выучили, сколько времени это заняло, и объясните, что вы почувствовали после этого."
          },
          speakingPart3: {
            prompt: "What skills are most important for young people entering the workforce today? Should schools focus more on practical skills or academic subjects?",
            promptRu: "Какие навыки наиболее важны для молодых людей, начинающих трудовую деятельность сегодня? Должны ли школы больше ориентироваться на практические навыки или на академические предметы?"
          }
        }
      },
      {
        testId: "2",
        title: "Test 2",
        sections: {
          readingTopic: "The history of the pencil and its impact on communication",
          listeningTopic: "A tour guide giving an introduction to a botanical garden",
          writingTask1: {
            prompt: "The charts show the proportion of water used for different purposes in four countries. Summarise and compare.",
            promptRu: "На диаграммах показана доля воды, используемой для различных целей в четырех странах. Опишите данные и сравните показатели."
          },
          writingTask2: {
            prompt: "It is important for people to travel to other countries to learn about different cultures. To what extent do you agree or disagree?",
            promptRu: "Для людей важно путешествовать в другие страны, чтобы узнавать о различных культурах. В какой степени вы согласны или не согласны?"
          },
          speakingPart1: {
            prompt: "Let's talk about history. Do you like learning about history? How did you learn history at school?",
            promptRu: "Давайте поговорим об истории. Нравится ли вам изучать историю? Как вы учили историю в школе?"
          },
          speakingPart2: {
            prompt: "Describe a historical building in your country. You should say: where it is, what it is used for, what it looks like, and explain why it is historically significant.",
            promptRu: "Опишите историческое здание в вашей стране. Укажите: где оно находится, для чего используется, как выглядит и объясните его историческую значимость."
          },
          speakingPart3: {
            prompt: "Why is it important to preserve historical buildings? Should governments spend money on maintaining old structures rather than building new ones?",
            promptRu: "Почему важно сохранять исторические здания? Должны ли правительства тратить деньги на содержание старых построек вместо возведения новых?"
          }
        }
      },
      {
        testId: "3",
        title: "Test 3",
        sections: {
          readingTopic: "The ecological importance of wolves in forest ecosystems",
          listeningTopic: "A student discussing their dissertation topic with a tutor",
          writingTask1: {
            prompt: "The plan below shows the proposed redevelopment of an old industrial area into a technology park. Summarise the information.",
            promptRu: "На плане ниже показана предлагаемая реконструкция старой промышленной зоны под технопарк. Опишите проект."
          },
          writingTask2: {
            prompt: "Some people think that international sports events promote peace and understanding, while others believe they lead to national conflicts. Discuss both views.",
            promptRu: "Некоторые считают, что международные спортивные события способствуют укреплению мира и взаимопониманию, в то время как другие думают, что они приводят к межнациональным конфликтам. Обсудите обе позиции."
          },
          speakingPart1: {
            prompt: "Let's talk about reading. Do you prefer reading physical books or e-books? What was the last book you read?",
            promptRu: "Давайте поговорим о чтении. Вы предпочитаете читать бумажные или электронные книги? Какую книгу вы прочитали последней?"
          },
          speakingPart2: {
            prompt: "Describe a public park or garden you enjoy visiting. You should say: where it is, what it looks like, what people do there, and explain why you like it.",
            promptRu: "Опишите общественный парк или сад, который вам нравится посещать. Укажите: где он находится, как выглядит, чем там занимаются люди и объясните, почему он вам нравится."
          },
          speakingPart3: {
            prompt: "Should cities invest more in public parks? What are the benefits of having green spaces in urban areas?",
            promptRu: "Должны ли города больше инвестировать в общественные парки? Каковы преимущества наличия зеленых зон в городских районах?"
          }
        }
      },
      {
        testId: "4",
        title: "Test 4",
        sections: {
          readingTopic: "The science of laughter and its physiological benefits",
          listeningTopic: "A monologue about the restoration of a local theater building",
          writingTask1: {
            prompt: "The bar chart below compares the percentage of adults who participated in various sport activities in 2015 and 2020. Summarise.",
            promptRu: "На столбчатой диаграмме ниже сравнивается процент взрослых, участвовавших в различных спортивных мероприятиях в 2015 и 2020 годах. Опишите данные."
          },
          writingTask2: {
            prompt: "Too much emphasis is placed on testing students in modern education. Do you agree or disagree with this view?",
            promptRu: "В современном образовании слишком большое значение придается тестированию учащихся. Согласны ли вы с этим мнением?"
          },
          speakingPart1: {
            prompt: "Let's talk about names. What does your name mean? Do you like your name?",
            promptRu: "Давайте поговорим об именах. Что означает ваше имя? Нравится ли вам ваше имя?"
          },
          speakingPart2: {
            prompt: "Describe a photograph that you like. You should say: who took it, when it was taken, what is in the photo, and explain why you like it.",
            promptRu: "Опишите фотографию, которая вам нравится. Укажите: кто ее сделал, когда она была сделана, что на ней изображено, и объясните, почему она вам нравится."
          },
          speakingPart3: {
            prompt: "How has photography changed with the rise of smartphones? Why do people like to share photos on social media?",
            promptRu: "Как изменилась фотография с появлением смартфонов? Почему люди любят делиться фотографиями в социальных сетях?"
          }
        }
      }
    ]
  },
  {
    bookId: "18",
    title: "Cambridge IELTS 18",
    tests: [
      {
        testId: "1",
        title: "Test 1",
        sections: {
          readingTopic: "The history of mapping and exploration in the Renaissance",
          listeningTopic: "Booking a holiday cottage in the countryside",
          writingTask1: {
            prompt: "The charts show the production and consumption of electricity in different countries. Summarise and compare.",
            promptRu: "На диаграммах показаны производство и потребление электроэнергии в разных странах. Опишите и сравните показатели."
          },
          writingTask2: {
            prompt: "Some people believe that children should learn how to manage money from an early age. Others believe this is the responsibility of parents when they are older. Discuss.",
            promptRu: "Некоторые считают, что дети должны учиться управлять деньгами с раннего возраста. Другие полагают, что это ответственность родителей, когда дети станут старше. Обсудите обе точки зрения."
          },
          speakingPart1: {
            prompt: "Let's talk about weather. What is your favorite kind of weather? Does the weather affect your mood?",
            promptRu: "Давайте поговорим о погоде. Какая ваша любимая погода? Влияет ли погода на ваше настроение?"
          },
          speakingPart2: {
            prompt: "Describe an interesting conversation you had with someone. You should say: who it was with, what you talked about, where it took place, and explain why it was interesting.",
            promptRu: "Опишите интересный разговор, который у вас состоялся. Укажите: с кем он был, о чем вы говорили, где он происходил, и объясните, почему он показался вам интересным."
          },
          speakingPart3: {
            prompt: "Why is face-to-face communication important in business? How can bad communication lead to problems in a workplace?",
            promptRu: "Почему личное общение важно в бизнесе? Как плохая коммуникация может привести к проблемам на рабочем месте?"
          }
        }
      },
      {
        testId: "2",
        title: "Test 2",
        sections: {
          readingTopic: "The commercial production and usage of plastic in the 20th century",
          listeningTopic: "A university induction speech about campus library services",
          writingTask1: {
            prompt: "The table below shows the percentage of people using various transport modes in a city in 2010 and 2020. Summarise.",
            promptRu: "В таблице ниже показан процент людей, использующих различные виды транспорта в городе в 2010 и 2020 годах. Опишите данные."
          },
          writingTask2: {
            prompt: "International travel is causing environmental damage. Some people think that tourists should pay a green tax to compensate. Do you agree?",
            promptRu: "Международные путешествия наносят вред окружающей среде. Некоторые думают, что туристы должны платить экологический налог для компенсации. Согласны ли вы?"
          },
          speakingPart1: {
            prompt: "Let's talk about transport. How do you travel to school or work? Do you think public transport is good in your area?",
            promptRu: "Давайте поговорим о транспорте. Как вы добираетесь до учебы или работы? Считаете ли вы общественный транспорт хорошим в вашем районе?"
          },
          speakingPart2: {
            prompt: "Describe an adventure you would like to go on. You should say: what the adventure is, where you would go, who you would go with, and explain why you want to do it.",
            promptRu: "Опишите приключение, в которое вы хотели бы отправиться. Укажите: что это за приключение, куда бы вы отправились, с кем бы поехали, и объясните, почему вы хотите это сделать."
          },
          speakingPart3: {
            prompt: "Why are some people drawn to extreme sports or dangerous activities? What safety measures should be taken in extreme sports?",
            promptRu: "Почему некоторых людей привлекают экстремальные виды спорта или опасные занятия? Какие меры безопасности следует принимать в экстремальном спорте?"
          }
        }
      },
      {
        testId: "3",
        title: "Test 3",
        sections: {
          readingTopic: "Bilingualism and its cognitive benefits in children",
          listeningTopic: "A telephone conversation reporting a stolen item and getting details",
          writingTask1: {
            prompt: "The diagrams show the structure of a solar panel and how it works to generate electricity. Summarise the process.",
            promptRu: "На схемах показано устройство солнечной панели и принцип ее работы для выработки электроэнергии. Опишите процесс."
          },
          writingTask2: {
            prompt: "Advertising has a major influence on children. Some people think advertising targeted at children should be banned. To what extent do you agree?",
            promptRu: "Реклама оказывает огромное влияние на детей. Некоторые считают, что реклама, направленная на детей, должна быть запрещена. В какой степени вы согласны?"
          },
          speakingPart1: {
            prompt: "Let's talk about concentrate. When do you find it hard to concentrate? What helps you focus on your work?",
            promptRu: "Давайте поговорим о концентрации. Когда вам трудно сосредоточиться? Что помогает вам сфокусироваться на работе?"
          },
          speakingPart2: {
            prompt: "Describe a performance you watched recently. You should say: what performance it was, who performed, where you watched it, and explain how you felt about it.",
            promptRu: "Опишите выступление или спектакль, который вы недавно смотрели. Укажите: что это было за выступление, кто выступал, где вы его смотрели и объясните свои впечатления."
          },
          speakingPart3: {
            prompt: "Why are live performances different from recorded ones? How important is cultural entertainment in a society?",
            promptRu: "Чем живые выступления отличаются от записанных? Насколько важны культурные развлечения в обществе?"
          }
        }
      },
      {
        testId: "4",
        title: "Test 4",
        sections: {
          readingTopic: "The architecture of bridges and engineering challenges",
          listeningTopic: "A student discussing course project details with an industrial manager",
          writingTask1: {
            prompt: "The bar chart shows the percentage of students studying foreign languages in primary schools in different regions. Summarise.",
            promptRu: "На столбчатой диаграмме показан процент учащихся, изучающих иностранные языки в начальных школах в разных регионах. Опишите данные."
          },
          writingTask2: {
            prompt: "Some people believe that success in life is determined by hard work. Others think factors like background and luck play a bigger role. Discuss.",
            promptRu: "Некоторые считают, что успех в жизни определяется упорным трудом. Другие думают, что происхождение и удача играют более важную роль. Обсудите обе позиции."
          },
          speakingPart1: {
            prompt: "Let's talk about maps. Do you use maps often? Do you prefer electronic maps or paper maps?",
            promptRu: "Давайте поговорим о картах. Часто ли вы пользуетесь картами? Вы предпочитаете электронные или бумажные карты?"
          },
          speakingPart2: {
            prompt: "Describe a town or city where you would like to live in the future. You should say: where it is, what it is like, how you know about it, and explain why you want to live there.",
            promptRu: "Опишите город или поселок, в котором вы хотели бы жить в будущем. Укажите: где он находится, какой он из себя, откуда вы о нем знаете и объясните, почему хотите там жить."
          },
          speakingPart3: {
            prompt: "What makes a city attractive to live in? What are the biggest problems associated with living in modern metropolitan cities?",
            promptRu: "Что делает город привлекательным для жизни? Каковы основные проблемы, связанные с жизнью в современных мегаполисах?"
          }
        }
      }
    ]
  },
  {
    bookId: "17",
    title: "Cambridge IELTS 17",
    tests: [
      {
        testId: "1",
        title: "Test 1",
        sections: {
          readingTopic: "The history of the domestic cat and its relationship with humans",
          listeningTopic: "Enquiry about registering at a local medical clinic",
          writingTask1: {
            prompt: "The line graph below shows the fluctuations in the prices of three metals between 2010 and 2020. Summarise.",
            promptRu: "На линейном графике ниже показаны колебания цен на три металла в период с 2010 по 2020 год. Опишите основные тенденции."
          },
          writingTask2: {
            prompt: "Some people believe that it is a good idea to build more housing in green belt areas. Others think these areas should be protected. Discuss.",
            promptRu: "Некоторые считают, что строительство жилья в пригородных зеленых зонах — хорошая идея. Другие полагают, что эти зоны следует защищать. Обсудите."
          },
          speakingPart1: {
            prompt: "Let's talk about books. How often do you read books? What was your favorite book in childhood?",
            promptRu: "Давайте поговорим о книгах. Как часто вы читаете книги? Какая была ваша любимая книга в детстве?"
          },
          speakingPart2: {
            prompt: "Describe an activity you enjoy doing in nature. You should say: what it is, where you do it, who you do it with, and explain why you enjoy it.",
            promptRu: "Опишите занятие на природе, которое вам нравится. Укажите: что это, где вы этим занимаетесь, с кем и объясните, почему вам это нравится."
          },
          speakingPart3: {
            prompt: "Do you think people spend enough time in nature today? What are the health benefits of spending time outdoors?",
            promptRu: "Как вы думаете, люди проводят достаточно времени на природе сегодня? Какова польза для здоровья от пребывания на свежем воздухе?"
          }
        }
      },
      {
        testId: "2",
        title: "Test 2",
        sections: {
          readingTopic: "The impact of light pollution on migratory birds",
          listeningTopic: "A telephone conversation discussing city recycling rules and procedures",
          writingTask1: {
            prompt: "The pie charts show the distribution of spending by a local council on various services in 2000 and 2015. Summarise.",
            promptRu: "На круговых диаграммах показано распределение расходов местного совета на различные услуги в 2000 и 2015 годах. Опишите данные."
          },
          writingTask2: {
            prompt: "In the future, driverless cars will become the main form of transport. Do the advantages of this trend outweigh the disadvantages?",
            promptRu: "В будущем беспилотные автомобили станут основным видом транспорта. Перевешивают ли преимущества этой тенденции ее недостатки?"
          },
          speakingPart1: {
            prompt: "Let's talk about social media. What social media apps do you use? How much time do you spend on them?",
            promptRu: "Давайте поговорим о социальных сетях. Какими приложениями соцсетей вы пользуетесь? Сколько времени вы в них проводите?"
          },
          speakingPart2: {
            prompt: "Describe a gift you received that was very special to you. You should say: what it was, who gave it to you, why they gave it, and explain why it was special.",
            promptRu: "Опишите подарок, который вы получили и который был для вас особенным. Укажите: что это было, кто вам его подарил, по какому поводу и объясните, почему он был особенным."
          },
          speakingPart3: {
            prompt: "Why do people give gifts in different cultures? Do you think the cost of a gift is important, or is it the thought that counts?",
            promptRu: "Почему люди дарят подарки в разных культурах? Считаете ли вы цену подарка важной, или главное — это внимание?"
          }
        }
      },
      {
        testId: "3",
        title: "Test 3",
        sections: {
          readingTopic: "The conservation of coastal wetlands and mangroves",
          listeningTopic: "A student presenting their research proposal on urban biodiversity",
          writingTask1: {
            prompt: "The plan shows the ground floor layout of an art gallery in 2005 and after redevelopment in 2025. Summarise.",
            promptRu: "На плане показана планировка первого этажа художественной галереи в 2005 году и после реконструкции в 2025 году. Опишите изменения."
          },
          writingTask2: {
            prompt: "It is more important for universities to invest in scientific research than in student social facilities. To what extent do you agree?",
            promptRu: "Для университетов важнее инвестировать в научные исследования, чем в социальные объекты для студентов. В какой степени вы согласны?"
          },
          speakingPart1: {
            prompt: "Let's talk about languages. How many languages do you speak? Do you think learning a new language is difficult?",
            promptRu: "Давайте поговорим о языках. На скольких языках вы говорите? Считаете ли вы изучение нового языка трудным?"
          },
          speakingPart2: {
            prompt: "Describe an interesting museum or gallery you visited. You should say: where it was, what you saw there, who you went with, and explain why it was interesting.",
            promptRu: "Опишите интересный музей или галерею, которую вы посетили. Укажите: где он находился, что вы там увидели, с кем ходили и объясните, почему вам там понравилось."
          },
          speakingPart3: {
            prompt: "What is the purpose of museums in modern society? Should admission to museums be free for everyone?",
            promptRu: "Какова цель музеев в современном обществе? Должен ли вход в музеи быть бесплатным для всех?"
          }
        }
      },
      {
        testId: "4",
        title: "Test 4",
        sections: {
          readingTopic: "The psychology of motivation and goal setting in sports",
          listeningTopic: "An expert monologue about the history and manufacture of brick making",
          writingTask1: {
            prompt: "The table below shows the percentage of adults who used different methods of reading in a country in three different years. Summarise.",
            promptRu: "В таблице ниже показан процент взрослых, использовавших различные способы чтения в стране в течение трех разных лет. Опишите данные."
          },
          writingTask2: {
            prompt: "Some people think that newspapers are the best way to get news. Others believe that online platforms are better. Discuss both views.",
            promptRu: "Некоторые считают газеты лучшим источником новостей. Другие полагают, что онлайн-платформы удобнее. Обсудите обе точки зрения."
          },
          speakingPart1: {
            prompt: "Let's talk about concentration. When do you find it easiest to focus? Does music help you study?",
            promptRu: "Давайте поговорим о концентрации. Когда вам легче всего сфокусироваться? Помогает ли музыка вам учиться?"
          },
          speakingPart2: {
            prompt: "Describe an exciting journey you made by public transport. You should say: where you went, what transport you used, who you were with, and explain why it was exciting.",
            promptRu: "Опишите увлекательную поездку на общественном транспорте. Укажите: куда вы ездили, каким транспортом пользовались, с кем были и объясните, почему поездка была интересной."
          },
          speakingPart3: {
            prompt: "What are the advantages of traveling by train compared to flying? How can governments encourage more people to use public transport?",
            promptRu: "Каковы преимущества поездки на поезде по сравнению с перелетом? Как правительства могут стимулировать людей чаще пользоваться общественным транспортом?"
          }
        }
      }
    ]
  },
  {
    bookId: "16",
    title: "Cambridge IELTS 16",
    tests: [
      {
        testId: "1",
        title: "Test 1",
        sections: {
          readingTopic: "The history of agriculture and crop rotation in Europe",
          listeningTopic: "A telephone registration conversation at a children's summer camp",
          writingTask1: {
            prompt: "The charts show the proportion of energy types used in a country in 1995 and 2005. Summarise.",
            promptRu: "На диаграммах показана доля типов энергии, использованных в стране в 1995 и 2005 годах. Опишите данные."
          },
          writingTask2: {
            prompt: "In some countries, it is common for people to change jobs frequently. In other countries, people prefer to stay in the same job. Discuss both.",
            promptRu: "В некоторых странах принято часто менять работу. В других люди предпочитают оставаться на одном месте. Обсудите оба подхода."
          },
          speakingPart1: {
            prompt: "Let's talk about writing. Do you prefer writing by hand or typing? How often do you write letters?",
            promptRu: "Давайте поговорим о письме. Вы предпочитаете писать от руки или печатать? Как часто вы пишете бумажные письма?"
          },
          speakingPart2: {
            prompt: "Describe a skill you would like to teach others. You should say: what it is, how you would teach it, what preparation is needed, and explain why you want to teach it.",
            promptRu: "Опишите навык, которому вы хотели бы обучить других. Укажите: что это за навык, как бы вы его преподавали, какая подготовка нужна и объясните, почему вы хотите этому научить."
          },
          speakingPart3: {
            prompt: "What makes someone a good teacher? How has education changed with the introduction of online classes?",
            promptRu: "Что делает человека хорошим учителем? Как изменилось образование с введением онлайн-уроков?"
          }
        }
      },
      {
        testId: "2",
        title: "Test 2",
        sections: {
          readingTopic: "The biological adaptation of desert reptiles to heat",
          listeningTopic: "An introduction speech by a guide at an open-air animal park",
          writingTask1: {
            prompt: "The table shows the average time spent on leisure activities in five countries in 2018. Summarise.",
            promptRu: "В таблице показано среднее время, затрачиваемое на досуг в пяти странах в 2018 году. Опишите данные."
          },
          writingTask2: {
            prompt: "Some people believe that local history is more important to learn than world history. To what extent do you agree or disagree?",
            promptRu: "Некоторые считают, что изучение местной истории важнее, чем изучение мировой истории. В какой степени вы согласны или не согласны?"
          },
          speakingPart1: {
            prompt: "Let's talk about music. What kind of music do you like? Do you play any musical instruments?",
            promptRu: "Давайте поговорим о музыке. Какую музыку вы любите? Играете ли вы на музыкальных инструментах?"
          },
          speakingPart2: {
            prompt: "Describe a piece of clothing you wear often. You should say: what it looks like, where you got it, how often you wear it, and explain why you like wearing it.",
            promptRu: "Опишите предмет одежды, который вы часто носите. Укажите: как он выглядит, где вы его взяли, как часто носите и объясните, почему он вам так нравится."
          },
          speakingPart3: {
            prompt: "Do you think people's clothing styles have changed over the past decades? How does fashion affect people's self-expression?",
            promptRu: "Как вы думаете, изменился ли стиль одежды людей за последние десятилетия? Как мода влияет на самовыражение людей?"
          }
        }
      },
      {
        testId: "3",
        title: "Test 3",
        sections: {
          readingTopic: "The history of the printing press and its impact on literacy",
          listeningTopic: "A student and a advisor discussing options for a marketing internship",
          writingTask1: {
            prompt: "The diagram below shows the plan of a library before and after extension and renovation. Summarise.",
            promptRu: "На схеме ниже показан план библиотеки до и после расширения и ремонта. Опишите основные изменения."
          },
          writingTask2: {
            prompt: "Many people think that sugar tax should be added to sugary foods to reduce health problems. Do you agree?",
            promptRu: "Многие думают, что налог на сахар должен быть добавлен к сладким продуктам для снижения проблем со здоровьем. Согласны ли вы?"
          },
          speakingPart1: {
            prompt: "Let's talk about keys. Have you ever lost your keys? Do you think keys will be replaced by electronic locks in the future?",
            promptRu: "Давайте поговорим о ключах. Вы когда-нибудь теряли ключи? Думаете ли вы, что в будущем ключи будут заменены электронными замками?"
          },
          speakingPart2: {
            prompt: "Describe a time when you received very good news. You should say: what the news was, who told you, when it happened, and explain how you felt about it.",
            promptRu: "Опишите случай, когда вы получили очень хорошую новость. Укажите: что это была за новость, кто вам ее сообщил, когда это произошло, и объясните свои чувства."
          },
          speakingPart3: {
            prompt: "How does good news spread in a community? Does media focus too much on negative news instead of positive stories?",
            promptRu: "Как хорошие новости распространяются в обществе? Уделяют ли СМИ слишком много внимания негативным новостям вместо позитивных историй?"
          }
        }
      },
      {
        testId: "4",
        title: "Test 4",
        sections: {
          readingTopic: "The behavior of bees and the mechanism of pollination",
          listeningTopic: "A monologue explaining the facilities and booking rules at a community center",
          writingTask1: {
            prompt: "The bar chart below compares the sales of digital and paper books in a country from 2012 to 2020. Summarise.",
            promptRu: "На столбчатой диаграмме ниже сравниваются продажи цифровых и бумажных книг в стране с 2012 по 2020 год. Опишите данные."
          },
          writingTask2: {
            prompt: "Governments should provide free internet access in public areas. To what extent do you agree or disagree?",
            promptRu: "Правительства должны предоставлять бесплатный доступ в интернет в общественных местах. В какой степени вы согласны или не согласны?"
          },
          speakingPart1: {
            prompt: "Let's talk about nature. Do you like spending time in the countryside? What is the most beautiful natural place in your country?",
            promptRu: "Давайте поговорим о природе. Вам нравится проводить время в сельской местности? Какое самое красивое природное место в вашей стране?"
          },
          speakingPart2: {
            prompt: "Describe a decision you made that changed your life. You should say: what the decision was, why you made it, how it affected you, and explain why it was important.",
            promptRu: "Опишите решение, которое изменило вашу жизнь. Укажите: каким было решение, почему вы его приняли, как оно на вас повлияло и объясните его важность."
          },
          speakingPart3: {
            prompt: "What makes decisions difficult for young people? How much should parents help their children make important decisions?",
            promptRu: "Что затрудняет принятие решений молодыми людьми? Насколько родители должны помогать детям в принятии важных решений?"
          }
        }
      }
    ]
  }
];
