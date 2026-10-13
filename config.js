/* =========================================================================
   ❤️  MONTHSARY SURPRISE — CONFIGURATION FILE  ❤️
   -------------------------------------------------------------------------
   This is the ONLY file you need to edit to personalize the website.
   Change the text between the "quotes". Save the file, refresh the browser,
   and your changes appear instantly. No coding knowledge required.
   ========================================================================= */

const CONFIG = {

  /* -----------------------------------------------------------------------
     1. WELCOME SCREEN
     ----------------------------------------------------------------------- */

  // Her name or nickname (used in a few places, e.g. the music player).
  girlfriendName: "My Love, Pia",

  // The big title on the first screen.
  greeting: "Happy Monthsary, My Love ❤️",

  // The smaller line under the title.
  welcomeSubtitle: "I hope you like this little surprise I made for you po.",

  // The text on the big magical button.
  openButtonText: "Open Your Surprise, My love 💌",


  /* -----------------------------------------------------------------------
     2. PHOTO GALLERY
     -----------------------------------------------------------------------
     file     -> the real picture path
     fallback -> a second path tried automatically if "file" can't be found
     caption  -> the little note that appears on the photo

     Your photos live next to index.html (e.g. photo1.jpg ... photo8.jpg),
     but if you keep them in assets/images/ that works too. The player tries
     "file" first, then "fallback", then shows a graceful placeholder.
     ----------------------------------------------------------------------- */

  gallery: [
    { file: "./photo1.jpg", fallback: "assets/images/photo1.jpg", caption: "Sana maging totoo na 'to soon" },
    { file: "./photo2.jpg", fallback: "assets/images/photo2.jpg", caption: "Prettyy so muchh" },
    { file: "./photo3.jpg", fallback: "assets/images/photo3.jpg", caption: "Ackkk" },
    { file: "./photo4.jpg", fallback: "assets/images/photo4.jpg", caption: "Send more pics po love ko" },
    { file: "./photo5.jpg", fallback: "assets/images/photo5.jpg", caption: "Smile that I adore" },
    { file: "./photo6.jpg", fallback: "assets/images/photo6.jpg", caption: "Eto nikikiss ko bago matulog eh, ay" },
    { file: "./photo7.jpg", fallback: "assets/images/photo7.jpg", caption: "Ganda gandaaaa" },
    { file: "./photo8.jpg", fallback: "assets/images/photo8.jpg", caption: "Mwaaaaah" }
  ],


  /* -----------------------------------------------------------------------
     3. OUR FAVORITE MUSIC  🎵
     -----------------------------------------------------------------------
     HOW TO ADD A SONG (super easy):
       1. Copy your song file next to index.html — OR into assets/music/.
          The player tries the path in "file", then "fallback" if needed.
       2. Add ONE line below with the file path and the title you want shown:

              { file: "./our-song.mp3", fallback: "assets/music/our-song.mp3", title: "Our Song" },

       3. Save the file and refresh. Done! ❤️

     • Supported formats: .mp3, .wav, .ogg, .m4a, .flac (anything your
       browser can play).
     • Add as many songs as you want, separated by commas.
     • The player will skip songs that are missing instead of breaking.
     • Music NEVER autoplays — it starts only when the play button is pressed.
     ----------------------------------------------------------------------- */

  playlist: [
    { file: "./Tothapi - Panata (Lyrics).mp3", fallback: "assets/music/Tothapi - Panata (Lyrics).mp3", title: "Panata — Tothapi" },
    { file: "./She & Him - I Thought I Saw Your Face Today (Official Lyric Video).mp3", fallback: "assets/music/She & Him - I Thought I Saw Your Face Today (Official Lyric Video).mp3", title: "I Thought I Saw Your Face Today — She & Him" },
    // Add more songs here, one line each. Example:
    // { file: "./favorite.mp3", fallback: "assets/music/favorite.mp3", title: "Your Favorite" },
  ],

  // Set to true if you want the playlist to loop forever.
  loopMusic: false,

  // The volume the player starts at (0.0 to 1.0). 0.7 = 70%.
  startVolume: 0.7,


  /* -----------------------------------------------------------------------
     4. THE LOVE LETTER  💌
     -----------------------------------------------------------------------
     Use the special characters below to format the letter:
        \n   -> starts a new line
     Keep it inside the double quotes.
     ----------------------------------------------------------------------- */

  letter:
    "My love, happy 1st monthsary to us. Waaahh ang bilis parang kelan lang ❤️\n\n" +
    "Thank you for being part of my life and for giving me so many reasons to smile. " +
    "Every moment with you means something to me, and I hope I can keep making you feel loved, " +
    "appreciated, and understood.\n\n" +
    "I am grateful for our memories and excited for everything we still have to experience together. " +
    "Thank you for being you, my love.\n\n" +
    "I love you so so so muchhh. Happy monthsary, my favorite person. ❤️",


  /* -----------------------------------------------------------------------
     5. THE FINAL SURPRISE MESSAGE
     ----------------------------------------------------------------------- */

  // First line, shown quietly under the night sky.
  finalIntro: "Before you go, there's one last thing I want you to know...",

  // The cinematic heading that is revealed next.
  finalHeading: "Happy Monthsary, My Love ❤️",

  // The heartfelt message, typed out with a typewriter animation.
  finalMessage:
    "You are one of the most beautiful parts of my life. Thank you for being someone I cherish, " +
    "for sharing your moments with me, and for giving me memories I want to keep forever.\n\n" +
    "I hope we continue growing together, understanding each other, and choosing to make beautiful " +
    "memories even in the simplest moments.\n\n" +
    "If I could give you one thing, it would be the ability to see yourself through my eyes so you " +
    "could understand how special you are to me.\n\n" +
    "Happy monthsary, my love. Here's to us and to all the memories still waiting for us. " +
    "I love youuu Infinity and Beyond.  ❤️",

  // The final romantic line.
  finalTagline: "YOU + ME = MY FAVORITE STORY ♡"

};
