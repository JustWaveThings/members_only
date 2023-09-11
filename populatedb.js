#! /usr/bin/env node
require('dotenv').config();
const bcrypt = require('bcryptjs');

console.log('This script populates data directly into db');

const User = require('./models/users');
const Message = require('./models/messages');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

const mongoDB = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.dmc0his.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  // await addUsers(formattedUsers);
  await addMessages(formattedMessages);
  console.log('Debug: Closing mongoose');
  // mongoose.connection.close();
}

async function makeUser(user) {
  bcrypt.hash(user.password, 10, async (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    try {
      const addUser = new User({
        username: user.email,
        password: hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
      });
      await addUser.save();
      console.log(`Added user: ${user.firstName} ${user.lastName}`);
    } catch (err) {
      console.log(`Error adding user: ${user.firstName} ${user.lastName}`);
      console.log(err);
    }
  });
}

async function addUsers(users) {
  console.log('Adding users');
  await Promise.all(users.map((user) => makeUser(user)));
  console.log('Finished adding users');
}

async function makeMessages(messages) {
  try {
    const addMessage = new Message({
      title: messages.subject,
      message: messages.quote,
      timestamp: new Date(),
      user: messages.userId,
    });
    await addMessage.save();
    console.log(`Added message`);
  } catch (err) {
    console.log(`Error adding message`);
    console.log(err);
  }
}

async function addMessages(messages) {
  console.log('Adding messages');
  await Promise.all(messages.map((message) => makeMessages(message)));
  console.log('Finished adding messages');
}

const formattedUsers = [
  {
    firstName: 'Albert',
    lastName: 'Einstein',
    password: 'PVXVEPJchR',
    email: 'Albert@email.com',
  },
  {
    firstName: 'Martin',
    lastName: 'Luther King Jr.',
    password: '9SfibzNAtZ',
    email: 'Martin@email.com',
  },
  {
    firstName: 'Mahatma',
    lastName: 'Gandhi',
    password: 'rzBIpfMIsK',
    email: 'Mahatma@email.com',
  },
  {
    firstName: 'Leonardo',
    lastName: 'da Vinci',
    password: '97khcOI829',
    email: 'Leonardo@email.com',
  },
  {
    firstName: 'Winston',
    lastName: 'Churchill',
    password: 'kHEifllolX',
    email: 'Winston@email.com',
  },
  {
    firstName: 'Nelson',
    lastName: 'Mandela',
    password: 'QnvS3CB9LF',
    email: 'Nelson@email.com',
  },
  {
    firstName: 'William',
    lastName: 'Shakespeare',
    password: 'rFLDfvIhAU',
    email: 'William@email.com',
  },
  {
    firstName: 'Marie',
    lastName: 'Curie',
    password: 'tfMhITqzK0',
    email: 'Marie@email.com',
  },
  {
    firstName: 'Steve',
    lastName: 'Jobs',
    password: '5NY7h26zoC',
    email: 'Steve@email.com',
  },
  {
    firstName: 'Charles',
    lastName: 'Darwin',
    password: 'NFIB74apSF',
    email: 'Charles@email.com',
  },
  {
    firstName: 'Rosa',
    lastName: 'Parks',
    password: 'Dc4WfuhISH',
    email: 'Rosa@email.com',
  },
  {
    firstName: 'Pablo',
    lastName: 'Picasso',
    password: 'yTjIk1wkQz',
    email: 'Pablo@email.com',
  },
  {
    firstName: 'Abraham',
    lastName: 'Lincoln',
    password: 'tze8Gymtv3',
    email: 'Abraham@email.com',
  },
  {
    firstName: 'Eleanor',
    lastName: 'Roosevelt',
    password: 'msNfTsPMjp',
    email: 'Eleanor@email.com',
  },
  {
    firstName: 'Mark',
    lastName: 'Twain',
    password: '3bt2a7DqCG',
    email: 'Mark@email.com',
  },
  {
    firstName: 'Thomas',
    lastName: 'Edison',
    password: 'es1lzczw9y',
    email: 'Thomas@email.com',
  },
  {
    firstName: 'Helen',
    lastName: 'Keller',
    password: 'jGPXnDIvgH',
    email: 'Helen@email.com',
  },
  {
    firstName: 'Confucius',
    lastName: '',
    password: 'nfZNcR8W8W',
    email: 'Confucius@email.com',
  },
  {
    firstName: 'Alexander',
    lastName: 'Graham Bell',
    password: 's9vmVQzQyt',
    email: 'Alexander@email.com',
  },
  {
    firstName: 'Walt',
    lastName: 'Disney',
    password: 'PTIORyUVvJ',
    email: 'Walt@email.com',
  },
  {
    firstName: 'Marilyn',
    lastName: 'Monroe',
    password: 'HXoU3nbVN8',
    email: 'Marilyn@email.com',
  },
  {
    firstName: 'Walt',
    lastName: 'Whitman',
    password: 'KciTklatt4',
    email: 'Walt@email.com',
  },
  {
    firstName: 'Frida',
    lastName: 'Kahlo',
    password: 'm9T6BgFlmh',
    email: 'Frida@email.com',
  },
  {
    firstName: 'John',
    lastName: 'F. Kennedy',
    password: 'iVxS7DN72C',
    email: 'John@email.com',
  },
  {
    firstName: 'Socrates',
    lastName: '',
    password: 'I0VpHQuRjz',
    email: 'Socrates@email.com',
  },
  {
    firstName: 'Vincent',
    lastName: 'van Gogh',
    password: 'AYjZ37fVXK',
    email: 'Vincent@email.com',
  },
  {
    firstName: 'Henry',
    lastName: 'Ford',
    password: 'k39Vpd4JCZ',
    email: 'Henry@email.com',
  },
  {
    firstName: 'Buddha',
    lastName: '',
    password: 'DDbPNqTrxI',
    email: 'Buddha@email.com',
  },
  {
    firstName: 'Napoleon',
    lastName: 'Bonaparte',
    password: 'xkoB5384ae',
    email: 'Napoleon@email.com',
  },
  {
    firstName: 'Ralph',
    lastName: 'Waldo Emerson',
    password: 'p4SSvbO6k6',
    email: 'Ralph@email.com',
  },
  {
    firstName: 'Aristotle',
    lastName: '',
    password: 'o9UPtriKXe',
    email: 'Aristotle@email.com',
  },
  {
    firstName: 'Coco',
    lastName: 'Chanel',
    password: '1WcKogz9eN',
    email: 'Coco@email.com',
  },
  {
    firstName: 'Galileo',
    lastName: 'Galilei',
    password: 'YqMv1EslxZ',
    email: 'Galileo@email.com',
  },
  {
    firstName: 'Voltaire',
    lastName: '',
    password: 'hesAYajLU2',
    email: 'Voltaire@email.com',
  },
  {
    firstName: 'Mother',
    lastName: 'Teresa',
    password: 'fO3pe7OpZG',
    email: 'Mother@email.com',
  },
  {
    firstName: 'Leon',
    lastName: 'Trotsky',
    password: 'J2WCOTXEHt',
    email: 'Leon@email.com',
  },
  {
    firstName: 'Heraclitus',
    lastName: '',
    password: 'wEDIR2n6pv',
    email: 'Heraclitus@email.com',
  },
  {
    firstName: 'Emily',
    lastName: 'Dickinson',
    password: 'vGd3MQPt55',
    email: 'Emily@email.com',
  },
  {
    firstName: 'Confucius',
    lastName: '',
    password: 'Eaoa5xx3HZ',
    email: 'Confucius@email.com',
  },
  {
    firstName: 'Plato',
    lastName: '',
    password: 'cb2Po2pViw',
    email: 'Plato@email.com',
  },
  {
    firstName: 'Fyodor',
    lastName: 'Dostoevsky',
    password: 'F0XHmSWdhk',
    email: 'Fyodor@email.com',
  },
  {
    firstName: 'Sigmund',
    lastName: 'Freud',
    password: '459cS1gLFk',
    email: 'Sigmund@email.com',
  },
  {
    firstName: 'Karl',
    lastName: 'Marx',
    password: 'FhbYFD1mxc',
    email: 'Karl@email.com',
  },
  {
    firstName: 'Sir',
    lastName: 'Isaac Newton',
    password: 'GwLRIpuSnl',
    email: 'Sir@email.com',
  },
  {
    firstName: 'George',
    lastName: 'Orwell',
    password: 'DaqCLoZlXt',
    email: 'George@email.com',
  },
  {
    firstName: 'Henry',
    lastName: 'David Thoreau',
    password: 'c0llVYQ45A',
    email: 'Henry@email.com',
  },
  {
    firstName: 'Charles',
    lastName: 'Dickens',
    password: 'PeIi5srsZP',
    email: 'Charles@email.com',
  },
];

const ObjectId = mongoose.Types.ObjectId;

const formattedMessages = [
  {
    name: 'Frida Kahlo',
    quote: 'I paint flowers so they will not die.',
    subject:
      'I am known for my iconic self-portraits and my exploration of Mexican culture in my artwork, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809b5'),
  },
  {
    name: 'John F. Kennedy',
    quote:
      'Ask not what your country can do for you, ask what you can do for your country.',
    subject:
      'I am known for serving as the 35th President of the United States and my inspirational inaugural address, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809b7'),
  },
  {
    name: 'Socrates',
    quote: 'An unexamined life is not worth living.',
    subject:
      'I am known for my contributions to philosophy and my method of questioning to stimulate critical thinking, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809b9'),
  },
  {
    name: 'Vincent van Gogh',
    quote: 'I dream my painting and I paint my dream.',
    subject:
      'I am known for my post-impressionist paintings and my struggles with mental health, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809bb'),
  },
  {
    name: 'Henry Ford',
    quote: "Whether you think you can or you think you can't, you're right.",
    subject:
      'I am known for revolutionizing the automobile industry and introducing assembly line production, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809bd'),
  },
  {
    name: 'Buddha',
    quote: 'The mind is everything. What you think you become.',
    subject:
      'I am known as the founder of Buddhism and for my teachings on achieving enlightenment, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809bf'),
  },
  {
    name: 'Napoleon Bonaparte',
    quote: 'Impossible is a word to be found only in the dictionary of fools.',
    subject:
      'I am known for my military leadership and my role as Emperor of the French, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809c1'),
  },
  {
    name: 'Ralph Waldo Emerson',
    quote:
      'Do not go where the path may lead, go instead where there is no path and leave a trail.',
    subject:
      'I am known for my essays and transcendentalist philosophy, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809c3'),
  },
  {
    name: 'Aristotle',
    quote: 'Happiness depends upon ourselves.',
    subject:
      'I am known for my contributions to philosophy, ethics, and politics in ancient Greece, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809c5'),
  },
  {
    name: 'Coco Chanel',
    quote: 'The most courageous act is still to think for yourself. Aloud.',
    subject:
      "I am known for my influential fashion designs and for revolutionizing women's fashion, and the quote I am most known for is:",
    userId: new ObjectId('64fe3677cb30124b951809c7'),
  },
  {
    name: 'Galileo Galilei',
    quote:
      'I do not feel obliged to believe that the same God who has endowed us with sense, reason, and intellect has intended us to forgo their use.',
    subject:
      'I am known for my contributions to astronomy, physics, and the scientific method, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809c9'),
  },
  {
    name: 'Voltaire',
    quote:
      "I do not agree with what you have to say, but I'll defend to the death your right to say it.",
    subject:
      'I am known for my advocacy of freedom of speech and my satirical writings, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809cb'),
  },
  {
    name: 'Mother Teresa',
    quote:
      'Spread love everywhere you go. Let no one ever come to you without leaving happier.',
    subject:
      'I am known for my humanitarian work and my devotion to helping the poor and sick, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809cd'),
  },
  {
    name: 'Leon Trotsky',
    quote: 'You may not be interested in war, but war is interested in you.',
    subject:
      'I am known for my role in the Russian Revolution and my contributions to Marxist theory, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809cf'),
  },
  {
    name: 'Heraclitus',
    quote: 'Change is the only constant in life.',
    subject:
      'I am known for my philosophy on the nature of change and the unity of opposites, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809d1'),
  },
  {
    name: 'Emily Dickinson',
    quote:
      'Hope is the thing with feathers that perches in the soul and sings the tune without the words and never stops at all.',
    subject:
      'I am known for my innovative and introspective poetry, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809d3'),
  },
  {
    name: 'Confucius',
    quote: "Real knowledge is to know the extent of one's ignorance.",
    subject:
      'I am known for my teachings on ethics, morality, and personal development in ancient China, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809d5'),
  },
  {
    name: 'Plato',
    quote: 'At the touch of love, everyone becomes a poet.',
    subject:
      "I am known for my philosophical writings, including 'The Republic,' and my contributions to Western philosophy, and the quote I am most known for is:",
    userId: new ObjectId('64fe3677cb30124b951809d7'),
  },
  {
    name: 'Fyodor Dostoevsky',
    quote: 'Man is what he believes.',
    subject:
      "I am known for my existentialist novels like 'Crime and Punishment' and 'The Brothers Karamazov,' and the quote I am most known for is:",
    userId: new ObjectId('64fe3677cb30124b951809d9'),
  },
  {
    name: 'Sigmund Freud',
    quote: 'The ego is not master in its own house.',
    subject:
      'I am known for my pioneering work in psychoanalysis and the exploration of the human psyche, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809db'),
  },
  {
    name: 'Karl Marx',
    quote:
      'The philosophers have only interpreted the world, in various ways. The point, however, is to change it.',
    subject:
      "I am known for my co-authorship of 'The Communist Manifesto' and my influential writings on economics and politics, and the quote I am most known for is:",
    userId: new ObjectId('64fe3677cb30124b951809dd'),
  },
  {
    name: 'Albert Einstein',
    quote: 'The only source of knowledge is experience.',
    subject:
      'I am known for my groundbreaking theories in physics, including the theory of relativity, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809e7'),
  },
  {
    name: 'Sir Isaac Newton',
    quote:
      'If I have seen further, it is by standing on the shoulders of giants.',
    subject:
      'I am known for my laws of motion and universal gravitation, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809df'),
  },
  {
    name: 'George Orwell',
    quote: 'Freedom is the right to tell people what they do not want to hear.',
    subject:
      "I am known for my dystopian novel '1984' and my commentary on totalitarianism and censorship, and the quote I am most known for is:",
    userId: new ObjectId('64fe3677cb30124b951809e1'),
  },
  {
    name: 'Henry David Thoreau',
    quote: 'Rather than love, than money, than fame, give me truth.',
    subject:
      "I am known for my transcendentalist philosophy and my book 'Walden,' which advocates for simple living in nature, and the quote I am most known for is:",
    userId: new ObjectId('64fe3677cb30124b951809e3'),
  },
  {
    name: 'Charles Dickens',
    quote: 'It was the best of times, it was the worst of times.',
    subject:
      "I am known for my iconic novels like 'A Tale of Two Cities' and 'Oliver Twist,' which reflect social issues of the Victorian era, and the quote I am most known for is:",
    userId: new ObjectId('64fe3677cb30124b951809e5'),
  },
  {
    name: 'Pablo Picasso',
    quote: 'Everything you can imagine is real.',
    subject:
      'I am known for pioneering the art movement known as Cubism, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b9518099f'),
  },
  {
    name: 'Abraham Lincoln',
    quote:
      "In the end, it's not the years in your life that count. It's the life in your years.",
    subject:
      'I am known for serving as the 16th President of the United States and leading the country through the Civil War, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809a1'),
  },
  {
    name: 'Eleanor Roosevelt',
    quote:
      'The future belongs to those who believe in the beauty of their dreams.',
    subject:
      "I am known for my advocacy for civil rights, women's rights, and serving as the First Lady of the United States, and the quote I am most known for is:",
    userId: new ObjectId('64fe3677cb30124b951809a3'),
  },
  {
    name: 'Mark Twain',
    quote:
      'The two most important days in your life are the day you are born and the day you find out why.',
    subject:
      'I am known for my wit and humor as an American author and humorist, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809a5'),
  },
  {
    name: 'Thomas Edison',
    quote: "I have not failed. I've just found 10,000 ways that won't work.",
    subject:
      'I am known for my numerous inventions, including the practical electric light bulb, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809a7'),
  },
  {
    name: 'Helen Keller',
    quote:
      'The only thing worse than being blind is having sight but no vision.',
    subject:
      'I am known for overcoming deafness and blindness to become an author and activist, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809a9'),
  },
  {
    name: 'Confucius',
    quote:
      'Our greatest glory is not in never falling, but in rising every time we fall.',
    subject:
      'I am known for my teachings on ethics, morality, and personal development in ancient China, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809ab'),
  },
  {
    name: 'Alexander Graham Bell',
    quote:
      'When one door closes, another opens; but we often look so long and so regretfully upon the closed door that we do not see the one that has opened for us.',
    subject:
      'I am known for inventing the telephone and for my work in communication technology, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809ad'),
  },
  {
    name: 'Walt Disney',
    quote:
      'All our dreams can come true if we have the courage to pursue them.',
    subject:
      'I am known for founding The Walt Disney Company and creating iconic characters like Mickey Mouse, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809af'),
  },
  {
    name: 'Marilyn Monroe',
    quote:
      "Imperfection is beauty, madness is genius, and it's better to be absolutely ridiculous than absolutely boring.",
    subject:
      'I am known for my iconic status as a Hollywood actress and symbol of beauty and glamour, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809b1'),
  },
  {
    name: 'Walt Whitman',
    quote:
      'Do I contradict myself? Very well then, I contradict myself. I am large, I contain multitudes.',
    subject:
      'I am known for my poetry and my exploration of the complexity of the human experience, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b951809b3'),
  },
  {
    name: 'Albert Einstein',
    quote: 'Imagination is more important than knowledge.',
    subject:
      'I am known for my groundbreaking theory of relativity, and the quote I am most known for is:',
    userId: new ObjectId('64fe34c8604b4a78608f41f7'),
  },
  {
    name: 'Martin Luther King Jr.',
    quote:
      'Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.',
    subject:
      'I am known for my leadership in the American civil rights movement, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b9518098b'),
  },
  {
    name: 'Mahatma Gandhi',
    quote: 'You must be the change you wish to see in the world.',
    subject:
      "I am known for my role in India's struggle for independence through nonviolent civil disobedience, and the quote I am most known for is:",
    userId: new ObjectId('64fe3677cb30124b9518098d'),
  },
  {
    name: 'Leonardo da Vinci',
    quote: 'Simplicity is the ultimate sophistication.',
    subject:
      'I am known for my diverse talents as a painter, inventor, and scientist, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b9518098f'),
  },
  {
    name: 'Winston Churchill',
    quote:
      'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    subject:
      'I am known for my leadership as the Prime Minister of the United Kingdom during World War II, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b95180991'),
  },
  {
    name: 'Nelson Mandela',
    quote:
      'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    subject:
      'I am known for my role in ending apartheid in South Africa and becoming its first black president, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b95180993'),
  },
  {
    name: 'William Shakespeare',
    quote: "All the world's a stage, and all the men and women merely players.",
    subject:
      'I am known for my contributions to English literature and playwrighting, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b95180995'),
  },
  {
    name: 'Marie Curie',
    quote:
      'Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.',
    subject:
      'I am known for my pioneering research on radioactivity and being the first woman to win a Nobel Prize, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b95180997'),
  },
  {
    name: 'Steve Jobs',
    quote:
      'Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.',
    subject:
      'I am known for co-founding Apple Inc. and revolutionizing the technology industry, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b95180999'),
  },
  {
    name: 'Charles Darwin',
    quote:
      'It is not the strongest of the species that survives, nor the most intelligent that survives. It is the one most responsive to change.',
    subject:
      'I am known for my theory of evolution by natural selection, and the quote I am most known for is:',
    userId: new ObjectId('64fe3677cb30124b9518099b'),
  },
];

// I want to add a message to the db that makes it appear that the user has posted it. I need to grab the user's object ID and then add it to the facts object for each message. I can then use the user's object ID to populate the database correctly so that a member would see Abraham Lincoln's name on the message.

// query db for all users name and id and store in an array

async function findId() {
  const id = await User.find({}, 'firstName lastName _id');
  console.log(id);
}
// now I need to match the user's first name to the first name in the facts array and then add the user's id to the facts array

function addId(id, facts) {
  facts.map((fact) => {
    id.map((user) => {
      if (fact.name.includes(user.firstName)) {
        fact.userId = user._id;
      }
    });
  });
  console.log(facts);
}

// addId(ids, famousPeopleWithFacts);
