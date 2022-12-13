const words = ["the","of","to","and","a","in","is","it","you","that","he","was","for","on","are","with","as","I","his","they","be","one","have","this","from","or","had","by","hot","but","some","what","there","we","can","out","other","were","all","your","when","up","use","word","how","said","an","each","she","which","do","their","time","if","will","way","about","many","then","them","would","write","like","so","these","her","long","make","thing","see","him","two","has","look","more","day","could","go","come","did","my","sound","no","most","number","who","over","know","water","than","call","first","people","may","down","side","been","now","find","any","new","work","part","take","get","place","made","live","where","after","back","little","only","round","man","year","came","show","every","good","me","give","our","under","name","very","through","just","form","much","great","think","say","help","low","line","before","turn","cause","same","mean","differ","move","right","boy","old","too","does","tell","sentence","set","three","want","air","well","also","play","small","end","put","home","read","hand","port","large","spell","add","even","land","here","must","big","high","such","follow","act","why","ask","men","change","went","light","kind","off","need","house","try","us","again","animal","point","mother","world","near","build","self","earth","father","head","own","page","should","country","found","answer","grow","learn","plant","cover","food","sun","four","thought","let","keep","eye","never","last","door","between","city","tree","cross","since","hard","start","might","saw","far","sea","left","late","run","don't","while","press","close","night","real","life","few","open","seem","next","white","children","got","walk","example","ease","paper","often","always","those","both","letter","until","mile","river","car","feet","care","second","carry","took","rain","eat","room","friend","began","fish","mountain","north","once","base","hear","horse","cut","sure","wood","main","enough","plain","girl","usual","young","ready","above","ever","red","list","though","feel","talk","bird","soon","body","dog","family","direct","pose","leave","song","measure","state","black","short","numeral","class","wind","question","happen","complete","ship","area","half","rock","fire","south","problem","piece","told","knew","pass","farm","top","whole","king","size","heard","best","hour","better","TRUE","during","hundred","am","remember","step","early","hold","west","ground","fast","five","sing","listen","six","table","travel","less","morning","ten","simple","several","vowel","toward","war","lay","against","pattern","slow","center","love","person","money","serve","appear","road","map","science","rule","pull","cold","notice","voice","fall","power","town","fine","certain","fly","unit","lead","cry","dark","machine","note","wait","plan","figure","star","box","noun","field","rest","correct","able","pound","done","beauty","drive","stood","contain","front","week","final","gave","green","oh","quick","develop","sleep","warm","free","minute","strong","special","mind","behind","clear","tail","fact","street","inch","lot","nothing","course","stay","wheel","full","force","blue","object","decide","surface","deep","moon","island","foot","yet","busy","test","boat","common","gold","possible","plane","age","dry","wonder","laugh","thousand","ago","ran","check","game","shape","yes","hot","miss","brought","heat","snow","bed","bring","sit","perhaps","fill","east","weight","language","among","terms","cookie","policy", "use", "privacy", "conditions","accessibility","website","us","our"];

module.exports = {
    words,
    clean(original){
        return original
            .split("\n").filter(Boolean).join(" ")
            .split(" ").filter(Boolean).join(" ");
    },
    removeCommonWords(original){
        return this.clean(original)
            .replace(new RegExp(`(^|\\s)(${words.join("|")})(\\s|$)`,"gi"), ' ')
    },
    countWords(str, words, wholeWords = true) {
        // Convert the string and array of words to lowercase for case-insensitive matching
        str = ` ${str} `.toLowerCase();
        words = words.map(word => word.toLowerCase());
        const wordsToSearch = str.split(" ").length;

        // Use the join method to create a regular expression that matches any of the words in the words array
        let regexp;
        if(wholeWords){
            regexp = new RegExp(`(^|\\s)(${words.join("|")})(\\s|$)`, "g");
        }else{
            regexp = new RegExp(words.join("|"), "g");
        }

        // Use the match method to find all occurrences of the words in the string
        let matches = str.match(regexp);

        // If matches is not null, return the length of the matches array
        if (matches) {
            return Math.round(100 / wordsToSearch * matches.length);
        }

        // If no matches are found, return 0
        return 0;
    }
}