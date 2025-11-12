// Complete CSV Parser for ai_prompts.csv
export interface CSVPromptData {
  category: string;
  imageUrl?: string;
  imageExplanation?: string;
  prompt: string;
  promptTemplate: string;
  examplePrompt: string;
  simplePrompts: string[];
}

export interface TracingPromptTemplate {
  category: string;
  userRequest: string;
  enhancedPrompt: string;
}

// Complete CSV data extracted from ai_prompts.csv
export const COMPLETE_CSV_PROMPTS: CSVPromptData[] = [
  // FlashCard Prompts
  {
    category: "FlashCards",
    imageUrl: "printable-vocabulary-flashcards-for-toddlers-1.png",
    imageExplanation: "Six flashcards, each featuring a simple, isolated illustration of an object or living thing, along with its name in a clear, sans-serif font below.",
    prompt: "Six flashcards for toddlers, each with a single, simple, bold, colorful cartoon illustration of an object, centered, with its name in clear black sans-serif text below the illustration. The flashcards are arranged in a 2x3 grid on a white background. Examples of objects include a carrot, a leaf, a ladybug, a pig, the Earth, and a flower.",
    promptTemplate: "Six flashcards for toddlers, arranged in a 2x3 grid on a white background. Each flashcard features a single, simple, bold, colorful cartoon illustration of [OBJECT 1], [OBJECT 2], [OBJECT 3], [OBJECT 4], [OBJECT 5], and [OBJECT 6]. Below each illustration, the object's name is written in clear black sans-serif text. The style is child-friendly, with prominent outlines and flat colors, designed for young children aged 2-5.",
    examplePrompt: "Six flashcards for toddlers, arranged in a 2x3 grid on a white background. Each flashcard features a single, simple, bold, colorful cartoon illustration of a red apple, a blue ball, a yellow duck, a green tree, a purple grape, and an orange cat. Below each illustration, the object's name is written in clear black sans-serif text. The style is child-friendly, with prominent outlines and flat colors, designed for young children aged 2-5.",
    simplePrompts: [
      "Toddler flashcards, 6 images.",
      "Simple picture cards for kids.",
      "Flashcards for children with names.",
      "Learning cards for toddlers.",
      "Animal flashcards for kids.",
      "Fruit flashcards, simple style.",
      "Shapes flashcards for toddlers.",
      "Flashcards of common objects."
    ]
  },
  {
    category: "FlashCards",
    imageUrl: "750f-10326722-1.png",
    imageExplanation: "Four flashcards, each featuring a simple, isolated illustration of an object or animal, along with its name in a clear, sans-serif font below.",
    prompt: "Four flashcards for toddlers, each with a single, simple, bold, colorful cartoon illustration of an object or animal, centered, with its name in clear black sans-serif text below the illustration. The flashcards are arranged in a 2x2 grid on a white background. The illustrations include a sippy cup, a smiling cat, a colorful beach ball, and a friendly dog.",
    promptTemplate: "Four flashcards for toddlers, arranged in a 2x2 grid on a white background. Each flashcard features a single, simple, bold, colorful cartoon illustration of [OBJECT/ANIMAL 1], [OBJECT/ANIMAL 2], [OBJECT/ANIMAL 3], and [OBJECT/ANIMAL 4]. Below each illustration, the object's or animal's name is written in clear black sans-serif text. The style is child-friendly, with prominent outlines and bright colors, designed for young children aged 2-5.",
    examplePrompt: "Four flashcards for toddlers, arranged in a 2x2 grid on a white background. Each flashcard features a single, simple, bold, colorful cartoon illustration of a red apple, a yellow duck, a blue car, and a green tree. Below each illustration, the object's or animal's name is written in clear black sans-serif text. The style is child-friendly, with prominent outlines and bright colors, designed for young children aged 2-5.",
    simplePrompts: [
      "Toddler flashcards, 4 images.",
      "Simple picture cards, 2x2 layout.",
      "Flashcards with words for kids.",
      "Learning cards for young children.",
      "Baby animals flashcards, 2x2 grid.",
      "Everyday objects flashcards for kids.",
      "Toy flashcards, simple drawings.",
      "Flashcards: cup, cat, ball, dog."
    ]
  },
  {
    category: "FlashCards",
    imageUrl: "a4-1.jpg",
    imageExplanation: "Four flashcards, each featuring a vibrant, child-friendly illustration of a common object or animal. The background of each card is a soft, colorful gradient with subtle star or sparkle accents, and each card has a pink border.",
    prompt: "Four vibrant flashcards for toddlers, arranged in a 2x2 grid. Each card has a soft, colorful gradient background with subtle sparkle accents and a pink border. Each flashcard features a single, prominent, cheerful cartoon illustration: a smiling sun, a green tree, a happy pink pig, and a black and white cow with a bell. Below each illustration, its name is written in clear, bold black sans-serif text.",
    promptTemplate: "Four vibrant flashcards for toddlers, arranged in a 2x2 grid. Each card has a [BACKGROUND COLOR/GRADIENT] background with subtle [ACCENT TYPE, e.g., sparkle, star, dot] accents and a [BORDER COLOR] border. Each flashcard features a single, prominent, cheerful cartoon illustration of [OBJECT/ANIMAL 1], [OBJECT/ANIMAL 2], [OBJECT/ANIMAL 3], and [OBJECT/ANIMAL 4]. Below each illustration, its name is written in clear, bold black sans-serif text. The style is bright, engaging, and suitable for young children aged 2-5.",
    examplePrompt: "Four vibrant flashcards for toddlers, arranged in a 2x2 grid. Each card has a light blue background with subtle cloud accents and a yellow border. Each flashcard features a single, prominent, cheerful cartoon illustration of a red apple, a yellow duck, a blue car, and a green frog. Below each illustration, its name is written in clear, bold black sans-serif text. The style is bright, engaging, and suitable for young children aged 2-5.",
    simplePrompts: [
      "Bright flashcards for toddlers, 4 cards.",
      "Colorful learning cards for kids.",
      "Flashcards with pictures and names, fun style.",
      "Kids' teaching cards, 2x2 layout.",
      "Farm animal flashcards, cute style.",
      "Nature flashcards for preschoolers.",
      "Sun, tree, pig, cow flashcards.",
      "Flashcards for young children with a cheerful look."
    ]
  },
  {
    category: "FlashCards",
    imageUrl: "1600w-jGAQyErRL5w.png",
    imageExplanation: "Eight flashcards, each featuring a cute, simplified cartoon illustration of an animal. The cards have rounded corners and subtle pastel-colored backgrounds with thin borders matching the background color.",
    prompt: "Eight flashcards for toddlers, arranged in a 2x4 grid. Each card has rounded corners and a soft pastel background (alternating light purple and light green) with a thin matching border. Each flashcard features a single, prominent, cute cartoon illustration of an animal, centered. The animals include an alligator, a bear, a cat, a dog, an elephant, a fish, a goat, and a hippo. Below each illustration, its name is written in clear, bold, sans-serif text, with text color complementing the card's background.",
    promptTemplate: "Eight flashcards for toddlers, arranged in a 2x4 grid. Each card has rounded corners and a soft pastel [BACKGROUND COLOR/PATTERN] with a thin matching border. Each flashcard features a single, prominent, cute cartoon illustration of [ANIMAL 1], [ANIMAL 2], [ANIMAL 3], [ANIMAL 4], [ANIMAL 5], [ANIMAL 6], [ANIMAL 7], and [ANIMAL 8]. Below each illustration, its name is written in clear, bold, sans-serif text, with the text color complementing the card's background. The style is gentle, friendly, and suitable for young children aged 2-5.",
    examplePrompt: "Eight flashcards for toddlers, arranged in a 2x4 grid. Each card has rounded corners and a soft pastel yellow background with a thin matching border. Each flashcard features a single, prominent, cute cartoon illustration of a lion, a monkey, a zebra, a giraffe, a tiger, a panda, a koala, and a parrot. Below each illustration, its name is written in clear, bold, sans-serif text, with the text color complementing the card's background. The style is gentle, friendly, and suitable for young children aged 2-5.",
    simplePrompts: [
      "Animal flashcards for kids, 8 cards.",
      "Cute animal learning cards.",
      "Flashcards with cartoon animals and names.",
      "Preschool animal cards, 2x4 layout.",
      "Wild animal flashcards, gentle style.",
      "Flashcards: alligator, bear, cat, dog, elephant, fish, goat, hippo.",
      "Cute animal cards for toddlers.",
      "Learning cards with different animals."
    ]
  },
  // Letter Prompts
  {
    category: "Letters",
    imageUrl: "Letter-A-Trace-Color-Find-791x1024.jpg",
    imageExplanation: "A black and white worksheet designed for teaching a toddler the letter 'A'. The page is divided into four sections: tracing uppercase and lowercase 'A', coloring an airplane, and finding the letter 'A'.",
    prompt: "A black and white toddler worksheet for the letter 'A'. The page is divided into four sections. The top left has a dotted uppercase 'A' for tracing. The top right has a dotted lowercase 'a' for tracing. The bottom left has a simple line drawing of an airplane to color. The bottom right has a 'find the letter A' activity with various uppercase and lowercase letters.",
    promptTemplate: "A black and white toddler worksheet for the letter [LETTER, e.g., 'B']. The page is divided into four sections. The top left has a dotted uppercase [LETTER] for tracing. The top right has a dotted lowercase [LETTER] for tracing. The bottom left has a simple line drawing of a [OBJECT STARTING WITH THE LETTER, e.g., 'ball'] to color. The bottom right has a 'find the letter [LETTER]' activity with various uppercase and lowercase letters. The page has headings for 'Name' and 'Date' at the top.",
    examplePrompt: "A black and white toddler worksheet for the letter 'B'. The page is divided into four sections. The top left has a dotted uppercase 'B' for tracing. The top right has a dotted lowercase 'b' for tracing. The bottom left has a simple line drawing of a balloon to color. The bottom right has a 'find the letter B' activity with various uppercase and lowercase letters. The page has headings for 'Name' and 'Date' at the top.",
    simplePrompts: [
      "Create a letter tracing worksheet for kids.",
      "Alphabet worksheet for toddlers.",
      "Letter learning activity page.",
      "Black and white printable for preschoolers.",
      "Worksheet for the letter 'C' with a car.",
      "Trace the letter 'D' and color a dog.",
      "Letter 'E' tracing page for kindergarten.",
      "A worksheet to learn the letter 'F'."
    ]
  },
  {
    category: "Letters",
    imageUrl: "alphabet-01-scaled-e1615604469231.jpg",
    imageExplanation: "A black and white alphabet tracing worksheet for the letter 'A', designed for young children. At the top, there's a large, outlined uppercase 'A' with tracing arrows, next to a simple line drawing of an ant with the word 'ant' beside it.",
    prompt: "A black and white alphabet tracing worksheet for the uppercase letter 'A'. At the top, a large outlined 'A' with tracing arrows is shown next to a simple line drawing of an ant with the word 'ant'. Below this, there are two practice rows for tracing 'A', each starting with a solid 'A' followed by dashed lines. The bottom section features multiple lines of dashed uppercase 'A's for tracing practice. The worksheet is clean and functional.",
    promptTemplate: "A black and white alphabet tracing worksheet for the uppercase letter [LETTER, e.g., 'B']. At the top, a large outlined [LETTER] with tracing arrows is shown next to a simple line drawing of a [OBJECT STARTING WITH LETTER, e.g., 'bird'] with the word '[OBJECT NAME]'. Below this, there are two practice rows for tracing [LETTER], each starting with a solid [LETTER] followed by dashed lines. The bottom section features multiple lines of dashed uppercase [LETTER]s for tracing practice. The worksheet is clean and functional, designed for children aged 2-5.",
    examplePrompt: "A black and white alphabet tracing worksheet for the uppercase letter 'B'. At the top, a large outlined 'B' with tracing arrows is shown next to a simple line drawing of a bear with the word 'bear'. Below this, there are two practice rows for tracing 'B', each starting with a solid 'B' followed by dashed lines. The bottom section features multiple lines of dashed uppercase 'B's for tracing practice. The worksheet is clean and functional, designed for children aged 2-5.",
    simplePrompts: [
      "Letter tracing worksheet for kids.",
      "Alphabet practice page, black and white.",
      "Handwriting worksheet for preschoolers.",
      "Trace the letter [LETTER] activity.",
      "Worksheet to trace letter 'C' with a cat.",
      "Letter 'D' tracing practice with a dog picture.",
      "Uppercase 'E' tracing sheet for toddlers.",
      "Printable for learning to write letter 'F'."
    ]
  },
  {
    category: "Letters",
    imageUrl: "il_570xN.2415976053_5xh6.jpg",
    imageExplanation: "A simple, black and white letter tracing worksheet designed for early learners. The page has a decorative, torn-paper-style border. At the top, the title 'Trace the letters' is displayed next to a small drawing of an apple with a bite taken out of it.",
    prompt: "A black and white letter tracing worksheet with a decorative, torn-paper-style border. The title 'Trace the letters' is at the top, next to a small, simple line drawing of a bitten apple. The rest of the page is filled with six rows of dotted uppercase 'A' and lowercase 'a' pairs for tracing.",
    promptTemplate: "A black and white letter tracing worksheet for the letters [LETTER, e.g., 'B']. The page has a [BORDER STYLE, e.g., wavy, simple, torn-paper-style] border. The title '[TITLE, e.g., 'Trace the letters', 'My Letter Practice']' is at the top, next to a small, simple line drawing of a [OBJECT STARTING WITH LETTER, e.g., 'ball']. The rest of the page is filled with six rows of dotted uppercase [LETTER] and lowercase [LETTER] pairs for tracing.",
    examplePrompt: "A black and white letter tracing worksheet for the letters 'B'. The page has a simple, straight-line border. The title 'My Letter Practice' is at the top, next to a small, simple line drawing of a bee. The rest of the page is filled with six rows of dotted uppercase 'B' and lowercase 'b' pairs for tracing.",
    simplePrompts: [
      "Letter tracing worksheet for kids.",
      "Alphabet tracing page, simple style.",
      "Printable for learning letters.",
      "Worksheet for tracing letters for preschoolers.",
      "Worksheet to trace the letter 'C'.",
      "Practice page for tracing 'D' and 'd'.",
      "Simple tracing worksheet for the letters 'E' and 'e'.",
      "A page to practice writing the letter 'F'."
    ]
  },
  {
    category: "Letters",
    imageUrl: "letter-a-worksheet-for-preschoolers-11.jpg",
    imageExplanation: "A clean, black and white letter activity worksheet for early learners. The page is divided into three sections: a tracing section, a coloring section, and a simple picture coloring section.",
    prompt: "A simple black and white toddler worksheet for the letter 'A'. The page is divided into three sections from top to bottom. The top section, titled 'Trace the letters', has a single row of dashed uppercase and lowercase 'A' pairs for tracing. The middle section, 'Color the letters', features a large, outlined uppercase 'A' and lowercase 'a' for coloring. The bottom section, 'Color the apple', has a simple line drawing of an apple to be colored.",
    promptTemplate: "A simple black and white toddler worksheet for the letter [LETTER, e.g., 'B']. The page is divided into three sections from top to bottom. The top section, titled 'Trace the letters', has a single row of dashed uppercase and lowercase [LETTER] pairs for tracing. The middle section, 'Color the letters', features a large, outlined uppercase [LETTER] and lowercase [LETTER] for coloring. The bottom section, 'Color the [OBJECT STARTING WITH LETTER, e.g., 'ball']', has a simple line drawing of a [OBJECT NAME] to be colored. The design is straightforward and functional for children aged 2-5.",
    examplePrompt: "A simple black and white toddler worksheet for the letter 'B'. The page is divided into three sections from top to bottom. The top section, titled 'Trace the letters', has a single row of dashed uppercase and lowercase 'B' pairs for tracing. The middle section, 'Color the letters', features a large, outlined uppercase 'B' and lowercase 'b' for coloring. The bottom section, 'Color the balloon', has a simple line drawing of a balloon to be colored. The design is straightforward and functional for children aged 2-5.",
    simplePrompts: [
      "Letter worksheet for kids, trace and color.",
      "Alphabet activity page, black and white.",
      "Simple letter practice sheet.",
      "A worksheet to learn a new letter.",
      "Worksheet for letter 'C', trace and color.",
      "Practice page for the letter 'D' with a picture of a dog.",
      "Trace and color the letter 'E' worksheet.",
      "A simple activity page for the letter 'F'."
    ]
  },
  {
    category: "Letters",
    imageUrl: "99b228ee8cebd23a79ba75963ed8221a.jpg",
    imageExplanation: "A black and white alphabet activity worksheet focused on the letter 'B'. The top section features a bold uppercase 'B' along with several simple line-art illustrations of objects or animals that start with 'B'.",
    prompt: "A black and white alphabet activity worksheet for the uppercase letter 'B'. The top half of the page features a large, bold uppercase 'B' along with simple line-art illustrations of a soccer ball, a bee, a book, a butterfly, and a bell. The bottom half of the page contains multiple rows of dotted uppercase 'B's for handwriting tracing practice. The worksheet is clear and functional for early learners.",
    promptTemplate: "A black and white alphabet activity worksheet for the uppercase letter [LETTER, e.g., 'C']. The top half of the page features a large, bold uppercase [LETTER] along with simple line-art illustrations of [OBJECT/ANIMAL 1 STARTING WITH LETTER, e.g., 'car'], [OBJECT/ANIMAL 2 STARTING WITH LETTER, e.g., 'cat'], [OBJECT/ANIMAL 3 STARTING WITH LETTER, e.g., 'cup'], and [OBJECT/ANIMAL 4 STARTING WITH LETTER, e.g., 'cake']. The bottom half of the page contains multiple rows of dotted uppercase [LETTER]s for handwriting tracing practice. The worksheet is clear and functional for children aged 2-5.",
    examplePrompt: "A black and white alphabet activity worksheet for the uppercase letter 'C'. The top half of the page features a large, bold uppercase 'C' along with simple line-art illustrations of a car, a cat, a cup, and a cake. The bottom half of the page contains multiple rows of dotted uppercase 'C's for handwriting tracing practice. The worksheet is clear and functional for children aged 2-5.",
    simplePrompts: [
      "Letter worksheet with tracing and pictures.",
      "Alphabet activity page, black and white.",
      "Printable for learning letters.",
      "Handwriting practice for preschoolers.",
      "Worksheet for letter 'D' with tracing and pictures.",
      "Practice page for the letter 'E' with objects.",
      "Uppercase 'F' tracing sheet with simple drawings.",
      "Activity page for learning letter 'G' and its sound."
    ]
  },
  {
    category: "Letters",
    imageUrl: "c158131b-6bd0-4f50-a5c6-73dd35b83131.png",
    imageExplanation: "A black and white alphabet tracing worksheet focused on the letter 'D'. At the top, a large uppercase 'D' and lowercase 'd' are displayed. Next to them, there's a space for 'Name' and a simple line drawing of a dolphin.",
    prompt: "A black and white alphabet tracing worksheet for the letter 'D'. At the top, a large uppercase 'D' and lowercase 'd' are shown. To the right, there is a simple line drawing of a dolphin with the word 'Dolphin' and a 'Name:' field. Below this, guided tracing lines with stroke order numbers and arrows are provided for both uppercase and lowercase 'D'. The bottom half of the page contains multiple rows of dashed uppercase 'D's and lowercase 'd's for tracing practice. The worksheet is clean and designed for letter formation.",
    promptTemplate: "A black and white alphabet tracing worksheet for the letter [LETTER, e.g., 'E']. At the top, a large uppercase [LETTER] and lowercase [LETTER] are shown. To the right, there is a simple line drawing of a [OBJECT/ANIMAL STARTING WITH LETTER, e.g., 'elephant'] with the word '[OBJECT/ANIMAL NAME]' and a 'Name:' field. Below this, guided tracing lines with stroke order numbers and arrows are provided for both uppercase and lowercase [LETTER]. The bottom half of the page contains multiple rows of dashed uppercase [LETTER]s and lowercase [LETTER]s for tracing practice. The worksheet is clean, clear, and focused on letter formation for children aged 2-5.",
    examplePrompt: "A black and white alphabet tracing worksheet for the letter 'E'. At the top, a large uppercase 'E' and lowercase 'e' are shown. To the right, there is a simple line drawing of an elephant with the word 'Elephant' and a 'Name:' field. Below this, guided tracing lines with stroke order numbers and arrows are provided for both uppercase and lowercase 'E'. The bottom half of the page contains multiple rows of dashed uppercase 'E's and lowercase 'e's for tracing practice. The worksheet is clean, clear, and focused on letter formation for children aged 2-5.",
    simplePrompts: [
      "Letter tracing worksheet for kids.",
      "Alphabet practice page, black and white.",
      "Handwriting worksheet for preschoolers.",
      "Trace the letter [LETTER] with guide.",
      "Worksheet for letter 'F', trace with guides, with a fish.",
      "Practice page for 'G' and 'g' with a picture of a grape.",
      "Uppercase and lowercase 'H' tracing sheet with a horse.",
      "Activity page to learn to write the letter 'I' with an ice cream."
    ]
  },
  {
    category: "Letters",
    imageUrl: "566w-obl_Mufe3gs.png",
    imageExplanation: "A colorful, multi-activity worksheet designed for teaching the letter 'A' to toddlers. The page has a 'Name:' field at the top, followed by a section for tracing the uppercase and lowercase 'A' with directional arrows and numbers.",
    prompt: "A colorful toddler worksheet for the letter 'A'. The top section has a 'Name:' field. Below that, guided tracing for uppercase and lowercase 'A' with stroke order arrows and numbers. Then, the title 'Cut and paste the picture that begin with the letter Aa.' appears, with three empty squares below it. The bottom section, separated by a dashed cut line and scissors icon, features four small, colorful illustrations: an ant, an axe, an apple, and a pear.",
    promptTemplate: "A colorful toddler worksheet for the letter [LETTER, e.g., 'B']. The top section has a 'Name:' field. Below that, guided tracing for uppercase and lowercase [LETTER] with stroke order arrows and numbers. Then, the title 'Cut and paste the picture that begin with the letter [LETTER][lowercase letter].' appears, with three empty squares below it. The bottom section, separated by a dashed cut line and scissors icon, features four small, colorful illustrations: [OBJECT 1 STARTING WITH LETTER, e.g., 'bee'], [OBJECT 2 STARTING WITH LETTER, e.g., 'ball'], [OBJECT 3 STARTING WITH LETTER, e.g., 'bear'], and [OBJECT 4 NOT STARTING WITH LETTER, e.g., 'tree']. The worksheet combines tracing, letter recognition, and fine motor skills for children aged 2-5.",
    examplePrompt: "A colorful toddler worksheet for the letter 'B'. The top section has a 'Name:' field. Below that, guided tracing for uppercase and lowercase 'B' with stroke order arrows and numbers. Then, the title 'Cut and paste the picture that begin with the letter Bb.' appears, with three empty squares below it. The bottom section, separated by a dashed cut line and scissors icon, features four small, colorful illustrations: a bee, a ball, a bear, and a flower. The worksheet combines tracing, letter recognition, and fine motor skills for children aged 2-5.",
    simplePrompts: [
      "Letter worksheet with tracing, cutting, and pasting.",
      "Alphabet activity for kids, full page.",
      "Learning letter 'A' with pictures.",
      "Preschool worksheet for new letters.",
      "Worksheet for letter 'C' with cutting activity and tracing.",
      "Trace and cut pictures for the letter 'D'.",
      "Letter 'E' activity page, cut and paste.",
      "Printable for letter 'F' with tracing and picture sorting."
    ]
  }
];

export const TRACING_PROMPT_LIBRARY: TracingPromptTemplate[] = [
  {
    category: "Letters/Alphabet",
    userRequest: "Make letter B for my 3 year old",
    enhancedPrompt: `Generate a tracing worksheet for toddlers aged 2-4 years learning alphabet recognition and writing. Create the letter "B" in cartoon visual style, featuring extra large size specification with dotted lines tracing elements. The design should be thick bold lines thickness guide and use bright primary color scheme. Include directional arrows educational elements with rounded corners safety margins for small hands. Background must be white for printing clarity.`
  },
  {
    category: "Letters/Alphabet",
    userRequest: "I need the letter A with animals",
    enhancedPrompt: `Generate a flashcard for toddlers aged 2-4 years learning alphabet recognition and writing. Create the letter "A" in cartoon visual style, featuring jumbo sized size specification with adorable alligator integrated design. The design should be chunky design thickness guide and use bright primary color scheme. Include example words "Apple" and "Ant" educational elements with rounded corners safety margins and no sharp edges. Background must be white for printing clarity.`
  },
  {
    category: "Letters/Alphabet",
    userRequest: "Can you make lowercase d for tracing practice?",
    enhancedPrompt: `Generate a tracing worksheet for toddlers aged 2-4 years learning alphabet recognition and writing. Create the letter "d" in hand-drawn visual style, featuring toddler-friendly proportions size specification with numbered arrows tracing elements. The design should be thick bold lines thickness guide and use monochrome bold color scheme. Include starting points and directional guides educational elements with wide spacing safety margins. Background must be white for printing clarity.`
  },
  {
    category: "Letters/Alphabet",
    userRequest: "My child needs to practice writing their name - Emma",
    enhancedPrompt: `Generate a tracing worksheet for toddlers aged 2-4 years learning alphabet recognition and writing. Create the letters "EMMA" in bubble visual style, featuring extra large size specification with dotted lines tracing elements. The design should be chunky design thickness guide and use pastel rainbow color scheme. Include starting dots educational elements with safety margins for small hands. Background must be white for printing clarity.`
  },
  {
    category: "Letters/Alphabet",
    userRequest: "Make colorful ABC flashcards",
    enhancedPrompt: `Generate a flashcard for toddlers aged 2-4 years learning alphabet recognition and writing. Create the letters "A-Z" in cartoon visual style, featuring jumbo sized size specification with bright decorative tracing elements. The design should be thick bold lines thickness guide and use rainbow gradient color scheme. Include matching pictures educational elements with rounded corners safety margins. Background must be white for printing clarity.`
  },
  {
    category: "Letters/Alphabet",
    userRequest: "I want bubble letters for coloring",
    enhancedPrompt: `Generate a tracing worksheet for toddlers aged 2-4 years learning alphabet recognition and writing. Create bubble-style letters in photorealistic visual style, featuring extra large size specification with thick outlines tracing elements. The design should be finger-friendly width thickness guide and use monochrome bold color scheme. Include decorative borders educational elements with wide spacing safety margins. Background must be white for printing clarity.`
  },
  {
    category: "Letters/Alphabet",
    userRequest: "Make letter S that looks like a snake",
    enhancedPrompt: `Generate a sticker for toddlers aged 2-4 years learning alphabet recognition and writing. Create the letter "S" in cartoon visual style, featuring toddler-friendly proportions size specification with snake design integration tracing elements. The design should be thick outlines thickness guide and use bright primary color scheme. Include friendly snake features educational elements with no sharp edges safety margins. Background must be white for printing clarity.`
  },
  {
    category: "Letters/Alphabet",
    userRequest: "Can I get cursive letters for my 4 year old?",
    enhancedPrompt: `Generate a tracing worksheet for toddlers aged 2-4 years learning alphabet recognition and writing. Create simplified cursive letters in hand-drawn visual style, featuring large print size specification with gentle connecting strokes tracing elements. The design should be thick bold lines thickness guide and use high contrast color scheme. Include directional arrows educational elements with grip-friendly spacing safety margins. Background must be white for printing clarity.`
  },
  {
    category: "Letters/Alphabet",
    userRequest: "Make the alphabet with farm animals theme",
    enhancedPrompt: `Generate a flashcard for toddlers aged 2-4 years learning alphabet recognition and writing. Create the letters "A-Z" in cartoon visual style, featuring jumbo sized size specification with farm animals integrated tracing elements. The design should be chunky design thickness guide and use bright primary color scheme. Include animal names and sounds educational elements with rounded edges safety margins. Background must be white for printing clarity.`
  },
  {
    category: "Letters/Alphabet",
    userRequest: "I need big letters for wall decoration",
    enhancedPrompt: `Generate a flashcard for toddlers aged 2-4 years learning alphabet recognition and writing. Create decorative letters in photorealistic visual style, featuring extra large size specification suitable for wall display with 3D appearance tracing elements. The design should be bold appearance thickness guide and use vibrant gradient color scheme. Include shadow effects educational elements with rounded corners safety margins. Background must be white for printing clarity.`
  }
];

// Enhanced utility functions
export function getAllPromptsByCategory(category: string): CSVPromptData[] {
  return COMPLETE_CSV_PROMPTS.filter(prompt => prompt.category === category);
}

export function getRandomPromptsByCategory(category: string, count: number = 4): string[] {
  const categoryPrompts = getAllPromptsByCategory(category);
  const allSimplePrompts = categoryPrompts.flatMap(prompt => prompt.simplePrompts);
  return shuffleArray(allSimplePrompts).slice(0, count);
}

export function getFlashcardPrompts(count: number = 6): string[] {
  return getRandomPromptsByCategory("FlashCards", count);
}

export function getLetterPrompts(count: number = 6): string[] {
  return getRandomPromptsByCategory("Letters", count);
}

// Legacy functions for backward compatibility
export const FLASHCARD_PROMPTS = getAllPromptsByCategory("FlashCards");
export const LETTER_PROMPTS = getAllPromptsByCategory("Letters");

export function getRandomFlashcardPrompts(count: number = 4): string[] {
  return getFlashcardPrompts(count);
}

export function getRandomLetterPrompts(count: number = 4): string[] {
  return getLetterPrompts(count);
}

// Get specific prompts based on type
export function getColoringPrompts(): string[] {
  return [
    "A kite flying in sky",
    "A girl playing football on ground", 
    "An elephant eating grasses",
    "Friends playing with balls",
    "A butterfly on a flower",
    "A cat playing with yarn",
    "A colorful rainbow in the sky",
    "A happy sun with sunglasses",
    "A big tree with apples",
    "A cute puppy playing",
    "A beautiful flower garden",
    "A friendly dinosaur"
  ];
}

export function getTracingPromptLibrary(): TracingPromptTemplate[] {
  return TRACING_PROMPT_LIBRARY;
}

export function getTracingPrompts(): string[] {
  return TRACING_PROMPT_LIBRARY.map(prompt => prompt.userRequest);
}

// Utility function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get enhanced prompts for AI generation
export function getEnhancedColoringPrompt(simplePrompt: string): string {
  return `Create a simple, child-friendly coloring page line drawing of: ${simplePrompt}. 
  The image should be:
  - Black and white line art only (no colors)
  - Simple, bold outlines suitable for children aged 2-8
  - Clean, minimal design with no shading
  - Large, easy-to-color shapes
  - No text or words in the image
  - Suitable for printing and coloring with crayons or markers
  - Cartoon-style, friendly appearance`;
}

export function getEnhancedTracingPrompt(simplePrompt: string): string {
  const normalized = simplePrompt.trim().toLowerCase();
  const matchedPrompt = TRACING_PROMPT_LIBRARY.find((entry) => {
    const userRequest = entry.userRequest.trim().toLowerCase();
    const enhanced = entry.enhancedPrompt.trim().toLowerCase();
    return userRequest === normalized || enhanced === normalized;
  });

  if (matchedPrompt) {
    return matchedPrompt.enhancedPrompt;
  }

  return `Create a tracing worksheet for: ${simplePrompt}. 
The worksheet should include:
- Large, dotted letters or numbers for tracing
- Simple line drawings related to the content
- Practice lines for handwriting
- Child-friendly, educational design
- Suitable for children aged 2-8
- Black and white, printer-friendly format`;
}
