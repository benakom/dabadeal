
/* =================== CONFIG (à remplir) =================== */
const CONFIG = {
  STORE: "Dabadeal",
  CURRENCY: "درهم",
  WHATSAPP_NUMBER: "",          // ex: 2126XXXXXXXX (sans + ni 0) — affiche le bouton WhatsApp
  ORDER_WEBHOOK: "",            // URL Google Apps Script / Make / n8n qui enregistre les commandes
  TIER_DISCOUNT: 0.20,          // -20% sur chaque unité au-delà de la 1re
  BUNDLE_DISCOUNT: 0.15,        // -15% sur les produits ajoutés via "Ka-yechriwhom m3a ba3d"
  ORDER_BUMP_DISCOUNT: 0.30,    // -30% sur l'order bump du checkout
  POST_UPSELL_DISCOUNT: 0.30,   // -30% sur l'upsell après commande
  GIFT_THRESHOLD: 700,          // à partir de ce montant : -10% sur toute la commande
  GIFT_DISCOUNT: 0.10
};

/* =================== CATALOGUE =================== */
const IMG = (k,n)=>Array.from({length:n},(_,i)=>`img/${k}_${i}.jpg`);
const P = [
 { id:"robinet", sku:"TJ-940", cat:"دار", catL:"الدار", name:"حنفية الما السخون الكهربائية", short:"ما سخون فـ 3 ثواني، بلا بوطة", price:299, compare:499, badge:"الأكثر طلبا", img:IMG("robinet",4),
   hook:"ما تبقاش تتوضا بالما البارد فهاد البرد",
   lead:"حنفية كهربائية كتسخن الما فـ 3 حتى 5 ثواني. للوضوء، الدوش ولا الماعن — بلا بوطة، بلا شوفو، بلا ما تسنا.",
   bullets:["ما سخون فـ 3 حتى 5 ثواني","شاشة رقمية كتبين الحرارة","بلا بوطة غاز وبلا خزان","كتركب على الروبيني فالحيط ولا فوق المغسلة"],
   angleT:"الفجر، البرد، والما كيقطع اليدين…", angleP:"هادي هي اللحظة اللي كتبدلها هاد الحنفية. كتحلها والما السخون كيخرج فالحين: الوضوء براحتك، الدراري كيدوشو بلا بكا، والواليدين ما بقاوش كيعانيو مع الما البارد.",
   pains:["كتسنى الشوفو يسخن","البوطة كتسالي فنص الدوش","الدراري كيغوتو فالدوش","صبعانك كيتجمدو فالماعن"],
   feats:[["🔥","تسخين فوري","كتحل الروبيني والما كيسخن فالحين، بلا خزان."],["🌡️","تحكم فالحرارة","شاشة رقمية وزر كتضبط بيه سخون، دافي ولا بارد."],["💡","كتخدم غير ملي كتحتاجها","كتسخن غير الما اللي كيدوز، ماشي بحال الشوفو اللي كيبقى شاعل."]],
   specs:[["القوة","3000 - 5500 واط"],["الكورون","220 فولت"],["التسخين","فوري بلا خزان"],["الاستعمال","الحمام ولا المطبخ"],["فالكارطونة","الحنفية، الرشاش، الطيو، الحامل، البراغي"],["التركيب","فالحيط ولا فوق المغسلة"]],
   notice:"ركبها مع بريز فيها الأرض (terre)، بعيدة على رشان الما المباشر. خاص ضغط ديال الما مزيان باش تسخن بحال خاصها.",
   faq:[["واش التركيب صعيب؟","كتركب على مخرج الما بحال روبيني عادي والبراغي جايين معاها. إلا ما عندكش التجربة فالضو، عيط لتريسيان."],["واش كتصرف الضو بزاف؟","كتجبد الضو غير ملي كيدوز الما فيها وكتطفى بوحدها ملي كتسدها."]],
   xs:["seche","pieds"] },
 { id:"seche", sku:"TJ-793", cat:"دار", catL:"الدار", name:"نشافة الحوايج الكهربائية القابلة للطي", short:"حوايجك ناشفين فساعات، ماشي فأيام", price:449, compare:699, badge:"جديد الشتا", img:IMG("seche",4),
   hook:"فالشتا، الحوايج ما بقاوش كيبقاو 3 أيام مجبدين فالدار",
   lead:"نشافة كهربائية كتدور الهوا السخون 360° على الحوايج. كتعلقهم، كتشعلها، وكتنساهم. ومن بعد كتطويها وكتخبيها فبلاصة صغيرة.",
   bullets:["هوا سخون كيدور 360° على الحوايج","تايمر وشاشة + تيليكوموند","كتطوى وكتخبى ملي ما كتخدمش","مزيانة لحوايج الدراري، الفوطات والإيزارات"],
   angleT:"حوايج مبلولين، ريحة الرطوبة، والدراري ما عندهومش ما يلبسو…", angleP:"فالشتا والشتا، الحوايج ما كينشفوش. هاد النشافة كتنشف ليك فالدار، بلا سطح وبلا شمس، وكترجع الحوايج دافيين وريحتهم نقية.",
   pains:["الحوايج كيبقاو أيام مجبدين","ريحة الرطوبة فالحوايج","ما كاينش سطح ولا شمس","الدار عامرة بالحبال"],
   feats:[["🌀","تدوير الهوا 360°","الهوا السخون كيدور على الحوايج كاملين بالتساوي."],["⏱️","تايمر ذكي","كتختار الوقت وكتطفى بوحدها، مع تيليكوموند."],["📦","كتطوى","ملي كتسالي، كتطويها وكتخبيها فالبلاكار."]],
   specs:[["النوع","نشافة كهربائية بالهوا السخون"],["التحكم","شاشة + تيليكوموند"],["التايمر","إيه"],["التخزين","كتطوى"],["الكورون","220 فولت"],["الاستعمال","الدار، الشقة، الحمام"]],
   notice:"ما تعمرهاش بزاف باش الهوا يدوز مزيان، وبعدها على الما.",
   faq:[["شحال كتاخد باش تنشف؟","على حساب الثوب والكمية؛ الحوايج الخفاف كينشفو أسرع."],["واش كتطوى بصح؟","إيه، الهيكل كيتجمع والقاعدة كتولي صغيرة باش تخبيها."]],
   xs:["robinet","brosse"] },
 { id:"dos", sku:"TJ-1299", cat:"راحة", catL:"الراحة والصحة", name:"حزام دعم أسفل الظهر الاحترافي", short:"سند لظهرك فالخدمة والطريق", price:249, compare:399, badge:"مختار ليك", img:["img/dos_0.jpg","img/dos_2.jpg","img/dos_3.jpg"],
   hook:"ظهرك كيخدم عليك طول النهار… عطيه السند",
   lead:"حزام دعم لأسفل الظهر بصفائح فولاذية مرنة و3 وسادات كتنحاو. كيعاونك تحافظ على وقفة مزيانة وأنت خدام، كتسوق ولا كتهز الثقيل.",
   bullets:["صفائح فولاذية مرنة لثبات أكثر","3 وسادات كتنحاو على حساب الراحة ديالك","تثبيت 360° بلا ما يتزعزع","كيتلبس تحت الحوايج"],
   angleT:"كتنوض الصباح وظهرك قاسح؟", angleP:"السياقة، الخدمة واقف، ولا الكرسي ديال البيرو كيتعبو الظهر. هاد الحزام كيعطيك السند اللي كيخصك باش تكمل النهار براحة.",
   pains:["الوقفة الطويلة فالخدمة","ساعات السياقة","هز الثقيل","الكرسي ديال البيرو"],
   feats:[["🛡️","سند قوي","صفائح فولاذية مرنة كتبع شكل الظهر."],["🧩","3 وسادات","كتختار مستوى الدعم اللي مناسب ليك."],["👕","خفيف","كيتلبس تحت الحوايج بلا ما يبان."]],
   specs:[["الدعم","صفائح فولاذية مرنة"],["الوسادات","3 كتنحاو"],["التثبيت","360°"],["الثوب","مرن وكيتنفس"]],
   notice:"منتوج للراحة والسند، ماشي دوا. إلا كان عندك وجع قوي ولا مستمر، شاور الطبيب.",
   faq:[["واش كاين القياسات؟","الحزام كيتضبط بالسكراتش؛ عند التأكيد غادي نسولوك على قياس الكرش."],["واش نقدر نلبسو طول النهار؟","ننصحوك تلبسو فأوقات المجهود وتعطي لظهرك الراحة بين المرات."]],
   xs:["coussin","pieds"] },
 { id:"coussin", sku:"TJ-692", cat:"طوموبيل", catL:"الطوموبيل", name:"طقم وسادة الرقبة والظهر", short:"سوق ساعات بلا ما يتقطع ظهرك", price:249, compare:390, badge:"طقم 2 قطع", img:["img/coussin_3.jpg","img/coussin_1.jpg","img/coussin_2.jpg"],
   hook:"ساعات فالطريق ولا فالبيرو، ورقبتك وظهرك مرتاحين",
   lead:"طقم من وسادة للرقبة ووسادة لأسفل الظهر، فـ Memory Foam كيرجع لشكلو. كيتركبو على كرسي الطوموبيل ولا كرسي البيرو.",
   bullets:["وسادة رقبة + وسادة ظهر فطقم واحد","Memory Foam كيتبع شكل الجسم","كيتركبو فثواني على أي كرسي","غطا ناعم كيتنحى"],
   angleT:"الطريق طويلة… والكرسي ما كيرحمش", angleP:"سواء كنتي طاكسيست، ليفرور ولا خدام فالبيرو، الجلسة الطويلة كتخلص فالرقبة والظهر. هاد الطقم كيصحح الجلسة ديالك بلا ما تحس.",
   pains:["وجع الرقبة بعد السياقة","أسفل الظهر كيتقاسح","الكرسي قاسح ولا مايل","العيا فآخر النهار"],
   feats:[["☁️","Memory Foam","كيتبع شكل الرقبة والظهر وكيرجع لشكلو."],["🚗","للطوموبيل والبيرو","كيتربطو على أي كرسي."],["🧼","غطا كيتغسل","كتحيدو وكتغسلو ساهل."]],
   specs:[["المحتوى","وسادة رقبة + وسادة ظهر"],["المادة","Memory Foam"],["التركيب","سمطة قابلة للتعديل"],["الاستعمال","الطوموبيل، البيرو، الدار"]],
   notice:"", faq:[["واش كيصلحو لكل طوموبيل؟","إيه، السمطة كتضبط على أغلب الكراسي."]],
   xs:["dos","camera"] },
 { id:"pieds", sku:"TJ-9", cat:"راحة", catL:"الراحة والصحة", name:"جهاز تدليك القدمين الكهربائي", short:"15 دقيقة وريجليك يرتاحو", price:179, compare:299, badge:"هدية زوينة", img:IMG("pieds",4),
   hook:"نهار طويل؟ 15 دقيقة وريجليك يرتاحو",
   lead:"فراش تدليك كهربائي للرجلين فيه 8 أوضاع و19 مستوى ديال القوة. خفيف، كيتطوى، وكتحطو فين ما بغيتي قدام التلفزة.",
   bullets:["8 أوضاع ديال التدليك","19 مستوى ديال القوة","خفيف وكيتطوى","هدية زوينة للواليدين"],
   angleT:"الرجلين هما اللي كيهزو النهار كامل", angleP:"الوقفة، المشي والطالون كيتعبو الرجلين. حط رجليك على هاد الفراش وأنت كتفرج، وخليه يخدم عليك.",
   pains:["الرجلين عيانين فالعشية","الوقفة طول النهار","الدورة الدموية تقيلة","ما عندكش وقت للحمام"],
   feats:[["⚡","8 أوضاع","نقر، عجن، ضغط وغيرهم."],["🎚️","19 مستوى","من الخفيف حتى القوي."],["🎒","كيتطوى","كتهزو معاك فين ما مشيتي."]],
   specs:[["الأوضاع","8"],["مستويات القوة","19"],["الوزن","خفيف"],["التخزين","كيتطوى"]],
   notice:"ما ننصحوش بيه للحوامل، ولا اللي عندهم جهاز فالقلب (pacemaker).", faq:[["واش كيصلح للكبار فالسن؟","إيه، وكيبدا من مستوى خفيف بزاف."]],
   xs:["dos","canne"] },
 { id:"canne", sku:"TJ-1357", cat:"راحة", catL:"الراحة والصحة", name:"عكاز بمقعد قابل للطي", short:"يمشي ويرتاح فين ما بغا", price:229, compare:349, badge:"للواليدين", img:IMG("canne",4),
   hook:"هدية للواليدين: يمشيو بأمان، ويجلسو فين ما عياو",
   lead:"عكاز ومقعد فقطعة وحدة. كيتحمل حتى 100 كيلو، 3 رجلين ضد الزلق، وكيتطوى باش يتهز ساهل فالسوق، المسجد ولا السبيطار.",
   bullets:["عكاز + مقعد فقطعة وحدة","كيتحمل حتى 100 كيلو","3 رجلين ضد الزلق","كيتطوى وخفيف"],
   angleT:"الطابور طويل والكرسي ما كاينش", angleP:"فالسوق، فالسبيطار ولا فالطوبيس، الواليدين كيعياو ومالقاوش فين يجلسو. بهاد العكاز، الكرسي ديما معاهم.",
   pains:["الوقفة الطويلة فالطابور","ما كاينش فين يجلس","الخوف من الطيحة","المشي بعيد"],
   feats:[["🦯","ثابت","3 رجلين وقاعدة ضد الزلق."],["🪑","مقعد مريح","مقعد سميك للرجال والعيالات."],["🧳","كيتطوى","خفيف وساهل فالهز."]],
   specs:[["الحمولة","حتى 100 كيلو"],["الرجلين","3 ضد الزلق"],["المادة","ألومنيوم + فولاذ"],["التخزين","كيتطوى"]],
   notice:"", faq:[["واش كيصلح للطول ديال بابا؟","العلو تقريبا 75 سنتيم والمقعد 49 سنتيم."]],
   xs:["priere","pieds"] },
 { id:"priere", sku:"TJ-494", cat:"راحة", catL:"الراحة والصحة", name:"كرسي الجلوس بعد السجود", short:"صلي براحتك حتى مع وجع الركابي", price:249, compare:390, badge:"قبل رمضان", img:["img/priere_0.jpg"],
   hook:"صلي براحتك… حتى إلا كانو الركابي ولا الظهر كيوجعوك",
   lead:"كرسي صغير مريح كيعاونك تجلس وتنوض فالصلاة بلا ضغط على الركابي والكعبين. مثالي للكبار فالسن واللي عندهم وجع الظهر ولا المفاصل.",
   bullets:["كيخفف الضغط على الركابي والكعبين","هيكل حديد ثابت","مقعد مريح","صغير وساهل فالتخزين"],
   angleT:"الصلاة ولات كتعب الواليدين؟", angleP:"مع السن، الجلسة بين السجدتين والتشهد كتولي صعيبة. هاد الكرسي كيرجع ليهم الراحة فالصلاة، فالدار ولا فالمسجد. ورمضان قريب.",
   pains:["وجع الركابي فالجلسة","صعوبة النوض من السجود","وجع الظهر","الكرسي العادي كبير"],
   feats:[["🤲","مريح","كيخفف الضغط على المفاصل."],["🧱","ثابت","هيكل حديد ما كيتزعزعش."],["📏","صغير","كيتحط تحت الزربية ولا فالبلاكار."]],
   specs:[["الهيكل","حديد"],["المقعد","مريح ومبطن"],["الاستعمال","الدار والمسجد"]],
   notice:"", faq:[["واش كيصلح للمسجد؟","إيه، صغير وساهل فالهز."]],
   xs:["canne","pieds"] },
 { id:"grossesse", sku:"TJ-495", cat:"راحة", catL:"الراحة والصحة", name:"حزام الحمل 3 فـ 1", short:"خففي الثقل على ظهرك", price:249, compare:390, badge:"للماما", img:IMG("grossesse",4), variants:["M","L","XL","XXL"],
   hook:"خففي الثقل على ظهرك فشهور الحمل",
   lead:"حزام حمل كيتضبط على حساب الكرش من الشهر 3 حتى الشهر 9. كيرفع الكرش بلا ضغط وكيخفف التعب على أسفل الظهر.",
   bullets:["كيتضبط من الشهر 3 حتى 9","كيرفع الكرش بلا ضغط زايد","ثوب كيتنفس","ما كيتلفش وما كيطيحش"],
   angleT:"الشهور الأخيرة كتقال…", angleP:"الكرش كيكبر والظهر كيعيا. هاد الحزام كيقسم الثقل وكيخليك تتحركي، تخدمي وتمشي براحتك. وهدية زوينة لمرات خوك ولا لصاحبتك.",
   pains:["وجع أسفل الظهر","الثقل فالمشي","التعب فآخر النهار","الحوايج ما كيمسكوش"],
   feats:[["🤰","3 فـ 1","كيتبدل مع كل مرحلة ديال الحمل."],["🌬️","كيتنفس","ثوب مرن خفيف."],["🔒","ثابت","ما كيتلفش وما كيطيحش."]],
   specs:[["المقاسات","M · L · XL · XXL"],["المراحل","3-5 / 5-7 / 7-10 شهور"],["الثوب","مرن وكيتنفس"]],
   notice:"شاوري الطبيبة ديالك قبل الاستعمال إلا كان الحمل فيه شي خصوصية.",
   faq:[["كيفاش نختار المقاس؟","على حساب الدورة ديال الكرش؛ إلا كنتي بين جوج مقاسات، خدي الكبير. نقدرو نعاونوك فالتليفون."]],
   xs:["coussin","pieds"] },
 { id:"camera", sku:"TJ-629", cat:"طوموبيل", catL:"الطوموبيل", name:"كاميرا الطوموبيل 3 عدسات", short:"قدام، اللور وداخل الطوموبيل", price:449, compare:699, badge:"حماية", img:IMG("camera",4),
   hook:"فحالة شي حادثة، الكاميرا هي الشاهد ديالك",
   lead:"كاميرا بشاشة 4 بوصة كتسجل القدام، اللور وداخل الطوموبيل فنفس الوقت. Full HD 1080p، رؤية ليلية و G-sensor كيحفظ الفيديو فحالة الصدمة.",
   bullets:["3 عدسات: قدام + اللور + داخل","شاشة 4 بوصة و 1080p","رؤية ليلية","G-sensor كيحفظ الفيديو ملي كتوقع صدمة"],
   angleT:"شكون غادي يصدقك من بعد الحادثة؟", angleP:"الطريق عامرة بالمفاجآت. بهاد الكاميرا، عندك الدليل بالصوت والصورة، وكتعاونك حتى فالرجوع اللور (parking).",
   pains:["حادثة بلا شهود","الخلاف مع الأسورونس","الرجوع اللور صعيب","الطوموبيل مركونة فالليل"],
   feats:[["🎥","3 كاميرات","قدام، اللور وداخل الطوموبيل."],["🌙","رؤية ليلية","تصويرة واضحة فالظلام."],["💥","G-sensor","كيحفظ الفيديو ملي كتوقع صدمة."]],
   specs:[["الشاشة","4 بوصة"],["الجودة","1080p"],["الزاوية","170°"],["التسجيل","3 قنوات"],["الأمان","G-sensor"]],
   notice:"خاص بطاقة ذاكرة (micro SD) إلا ما كانتش مع الكارطونة؛ غادي نأكدو معاك فالتليفون.",
   faq:[["واش التركيب صعيب؟","كتلصق بالشفاط على الجاجة وكتربط فالولاعة؛ الكاميرا ديال اللور كتحتاج كابل."]],
   xs:["coussin","dos"] },
 { id:"brosse", sku:"TJ-1287", cat:"دار", catL:"الدار", name:"فرشاة البخار للقطط والكلاب", short:"شعر القط ما بقاش فالكنابي", price:129, compare:199, badge:"سعر خاص", img:IMG("brosse",4),
   hook:"شعر القط فالكنابي، فالحوايج، وفكل بلاصة؟",
   lead:"فرشاة كتخرج بخار خفيف باش تشد الشعر اللي طايح وتنقي الفرو. القط مرتاح، والدار نقية. كتشارجا بـ USB.",
   bullets:["بخار خفيف كيشد الشعر الطايح","سنان سيليكون ناعمين","كتشارجا بـ USB","للقطط والكلاب"],
   angleT:"كتحب القط ديالك… ولكن ماشي الشعر ديالو فكل بلاصة", angleP:"دقيقتين فالنهار بهاد الفرشاة، والشعر كيبقى فيها ماشي فالكنابي. والقط كيحسابها تدليك.",
   pains:["الشعر فالكنابي","الشعر فالحوايج","الفرو مكبب","القط كيهرب من المشط"],
   feats:[["💨","بخار خفيف","كيشد الشعر بلا ما يطير."],["🐾","ناعمة","سنان سيليكون مريحين."],["🔌","USB","كتشارجا بلا حجر."]],
   specs:[["الشحن","USB"],["السنان","سيليكون"],["الاستعمال","قطط وكلاب"]],
   notice:"", faq:[["واش البخار سخون؟","لا، بخار خفيف مناسب للحيوان."]],
   xs:["seche","robinet"] }
];
const byId = id => P.find(p=>p.id===id);
const W = s=>s.replace('.jpg','.webp'), S = s=>s.replace('.jpg','-s.webp');
const off = p => Math.round((1 - p.price/p.compare)*100);
const fmt = n => `${Math.round(n)} ${CONFIG.CURRENCY}`;
const tierUnit = p => Math.round(p.price*(1-CONFIG.TIER_DISCOUNT));
const bundleUnit = p => Math.round(p.price*(1-CONFIG.BUNDLE_DISCOUNT));

/* =================== STATE =================== */
let cart = [];  // {key,id,qty,variant,mode:'normal'|'bundle'|'bump'|'upsell'}
try { cart = JSON.parse(localStorage.getItem('dd_cart')||'[]'); } catch(e){}
const save = ()=>{ try{ localStorage.setItem('dd_cart', JSON.stringify(cart)); }catch(e){} };
let lastOrder = null;

function lineTotal(l){
  const p = byId(l.id);
  if (l.mode==='bundle') return bundleUnit(p)*l.qty;
  if (l.mode==='bump') return Math.round(p.price*(1-CONFIG.ORDER_BUMP_DISCOUNT))*l.qty;
  if (l.mode==='upsell') return Math.round(p.price*(1-CONFIG.POST_UPSELL_DISCOUNT))*l.qty;
  return p.price + Math.max(0,l.qty-1)*tierUnit(p);
}
function totals(list=cart){
  const sub = list.reduce((s,l)=>s+lineTotal(l),0);
  const compare = list.reduce((s,l)=>s+byId(l.id).compare*l.qty,0);
  const gift = sub>=CONFIG.GIFT_THRESHOLD ? Math.round(sub*CONFIG.GIFT_DISCOUNT) : 0;
  return {sub, gift, total: sub-gift, compare, saved: compare-(sub-gift), items: list.reduce((s,l)=>s+l.qty,0)};
}
function addToCart(id, qty=1, opts={}){
  const mode = opts.mode||'normal', variant = opts.variant||'';
  const key = id+'|'+mode+'|'+variant;
  const ex = cart.find(l=>l.key===key);
  if (ex) ex.qty += qty; else cart.push({key,id,qty,variant,mode});
  save(); renderCount(true);
  track('AddToCart',{content_ids:[byId(id).sku],value:byId(id).price,currency:'MAD'});
}
function setQty(key, q){ const l=cart.find(x=>x.key===key); if(!l) return; l.qty=q; if(l.qty<=0) cart=cart.filter(x=>x.key!==key); save(); renderCount(); renderDrawer(); }

/* =================== UTILS =================== */
const $ = s=>document.querySelector(s);
const app = $('#app');
function track(ev,data){ try{ if(window.fbq) fbq('track',ev,data||{}); if(window.ttq) ttq.track(ev,data||{}); }catch(e){} }
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('on'); clearTimeout(t._t); t._t=setTimeout(()=>t.classList.remove('on'),1800); }
function renderCount(b){ const c=$('#cartCount'); const n=totals().items; c.textContent=n; c.classList.toggle('on',n>0); if(b){ const btn=$('#cartBtn'); btn.classList.remove('bump'); void btn.offsetWidth; btn.classList.add('bump'); } }
function etaText(){
  const d=new Date(); const a=new Date(d); a.setDate(d.getDate()+1); const b=new Date(d); b.setDate(d.getDate()+3);
  const days=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
  return `اطلب دابا ويوصلك بين <b>${days[a.getDay()]}</b> و<b>${days[b.getDay()]}</b>`;
}
const ICON = {
  truck:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v10H3z"/><path d="M14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
  cash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v5M18 9.5v5"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
  swap:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h13l-3-3M20 17H7l3 3"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>',
  zap:'<svg class="zap" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>',
  lock:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'
};
document.getElementById('ann').innerHTML = Array(2).fill(`<span>🚚 <b>التوصيل مجاني</b> لجميع المدن</span><span>💵 <b>خلص ملي توصلك</b> السلعة</span><span>⚡ <b>-20٪</b> على الحبة الثانية</span><span>🎁 من ${CONFIG.GIFT_THRESHOLD} درهم: <b>-10٪</b> على الطلب كامل</span>`).join('');

/* =================== HOME =================== */
let homeCat = 'all';
function cardHTML(p){
  return `<article class="card">
    <a href="#p-${p.id}" class="ph">
      <img src="${S(p.img[0])}" alt="${p.name}" width="400" height="400" loading="lazy" decoding="async">${p.img[1]?`<img class="alt" src="${S(p.img[1])}" alt="" width="400" height="400" loading="lazy" decoding="async">`:''}
      <div class="badges"><span class="bd k">${p.badge}</span></div>
      <span class="bd-off">-${off(p)}%</span>
    </a>
    <div class="body">
      <span class="cat">${p.catL}</span>
      <a href="#p-${p.id}"><h3>${p.name}</h3></a>
      <p class="hook">${p.short}</p>
      <div class="price"><span class="now">${fmt(p.price)}</span><s>${fmt(p.compare)}</s></div>
      <div class="add">
        <a class="btn btn-o" href="#p-${p.id}">اطلب دابا</a>
        <button class="btn btn-ghost" data-quick="${p.id}" aria-label="زيد للسلة"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>
      </div>
    </div>
  </article>`;
}
function renderHome(){
  document.title = 'Dabadeal — ديالك دابا، خلص ملي يوصلك';
  const list = homeCat==='all'?P:P.filter(p=>p.cat===homeCat);
  const b1=byId('dos'), b2=byId('coussin'), b3=byId('pieds');
  const bSum=b1.price+bundleUnit(b2)+bundleUnit(b3), bCmp=b1.compare+b2.compare+b3.compare;
  app.innerHTML = `
  <section class="hero"><div class="container in">
    <div>
      <span class="pill"><i></i> عروض الشتا • الكمية محدودة</span>
      <h1 class="h">الحاجة اللي كتحل ليك <span class="o">المشكل</span>،<br>توصلك لباب الدار.</h1>
      <p>منتوجات مختارة وحدة بوحدة للراحة، الدار والطوموبيل. كتطلب فدقيقة، وكتخلص غير ملي كتوصلك السلعة.</p>
      <div class="ctas">
        <a class="btn btn-o" href="#" data-scroll="shop">${ICON.zap} شوف العروض</a>
        <a class="btn btn-ghost" style="background:rgba(255,255,255,.1);color:#fff" href="#p-robinet">الأكثر طلبا هاد الشتا</a>
      </div>
      <div class="proof">
        <div><b>0 درهم</b>التوصيل</div>
        <div><b>24-72 ساعة</b>مدة التوصيل</div>
        <div><b>-20٪</b>على الحبة الثانية</div>
      </div>
    </div>
    <div class="mosaic">
      ${['robinet','seche','dos','camera'].map(id=>{const p=byId(id);return `<a href="#p-${id}"><img src="${S(p.img[0])}" alt="${p.name}" width="400" height="400" decoding="async"><span>${fmt(p.price)}</span></a>`}).join('')}
    </div>
  </div></section>
  <div class="usp"><div class="container in">
    <div>${ICON.truck}<span>توصيل مجاني<small>لجميع المدن</small></span></div>
    <div>${ICON.cash}<span>الخلاص عند الاستلام<small>ما كتخلص حتى توصلك</small></span></div>
    <div>${ICON.phone}<span>تأكيد بالتليفون<small>كنعيطو ليك قبل الإرسال</small></span></div>
    <div>${ICON.swap}<span>استبدال ساهل<small>إلا وصلك شي عيب</small></span></div>
  </div></div>

  <section class="sec" id="shop"><div class="container">
    <div class="sec-h"><div><h2 class="h">الأكثر طلبا <span class="o">هاد الشتا</span></h2><p>10 منتوجات مختارين، كل واحد كيحل مشكل حقيقي.</p></div></div>
    <div class="chips">
      ${[['all','الكل'],['راحة','الراحة والصحة'],['دار','الدار'],['طوموبيل','الطوموبيل']].map(([k,l])=>`<button class="chip ${homeCat===k?'on':''}" data-chip="${k}">${l}</button>`).join('')}
    </div>
    <div class="grid">${list.map(cardHTML).join('')}</div>
  </div></section>

  <section class="sec" style="padding-top:10px"><div class="container">
    <div class="bundles">
      <div style="position:relative;z-index:1">
        <span class="pill"><i></i> باك التوفير</span>
        <h2 class="h" style="margin-top:10px">باك <span class="o">الظهر المرتاح</span></h2>
        <p>الحزام + طقم الوسادات + جهاز تدليك الرجلين. الحل الكامل للي خدام واقف ولا كيسوق طول النهار.</p>
        <div class="bprice"><b>${fmt(bSum)}</b><s>${fmt(bCmp)}</s><span class="save">وفر ${fmt(bCmp-bSum)}</span></div>
        <button class="btn btn-o btn-col" data-bundle="dos,coussin,pieds">زيد الباك للسلة<span class="sub">-15٪ على الجوج الآخرين</span></button>
      </div>
      <div class="bundle-items">
        ${[b1,b2,b3].map((p,i)=>`${i?'<span class="plus">+</span>':''}<div class="bi"><img src="${S(p.img[0])}" alt="" width="400" height="400" loading="lazy" decoding="async"><div>${p.name}</div></div>`).join('')}
      </div>
    </div>
  </div></section>

  <section class="sec" id="how" style="background:var(--sand)"><div class="container">
    <div class="sec-h"><h2 class="h">كيفاش <span class="o">كتطلب</span>؟</h2></div>
    <div class="steps">
      <div class="step"><div class="n">1</div><h3>اختار المنتوج</h3><p>وعمر الاسم، التليفون والعنوان. ما كتخلص والو دابا.</p></div>
      <div class="step"><div class="n">2</div><h3>كنعيطو ليك</h3><p>كنأكدو معاك الطلب والعنوان قبل ما نصيفطوه.</p></div>
      <div class="step"><div class="n">3</div><h3>خلص ملي توصلك</h3><p>الليفرور كيوصلك فـ 24 حتى 72 ساعة وكتخلصو كاش.</p></div>
    </div>
  </div></section>

  <section class="sec faq" id="faq"><div class="container" style="max-width:820px">
    <div class="sec-h"><h2 class="h">أسئلة <span class="o">كيتعاودو</span></h2></div>
    <details><summary>واش كنخلص قبل؟</summary><p>لا. كتخلص كاش للليفرور ملي توصلك السلعة لباب الدار.</p></details>
    <details><summary>شحال كياخد التوصيل؟</summary><p>بين 24 و72 ساعة على حساب المدينة، والتوصيل مجاني.</p></details>
    <details><summary>كيفاش كتخدم -20٪ على الحبة الثانية؟</summary><p>الحبة الأولى بالثمن ديال العرض، وكل حبة زايدة من نفس المنتوج كتنقص عليها 20٪ أوتوماتيكيا.</p></details>
    <details><summary>واش نقدر نطلب بزاف ديال المنتوجات فمرة وحدة؟</summary><p>إيه، زيدهم للسلة وكمل الطلب مرة وحدة. ومن ${CONFIG.GIFT_THRESHOLD} درهم كتاخد -10٪ على الطلب كامل.</p></details>
    <details><summary>إلا وصلني المنتوج فيه عيب؟</summary><p>عيط لينا ولا صيفط لينا فالواتساب وغادي نبدلوه ليك.</p></details>
  </div></section>`;
}

/* =================== PRODUCT PAGE =================== */
let pdp = {id:null, qty:1, variant:'', img:0, fbt:{}};
function renderPDP(id){
  const p = byId(id); if(!p){ location.hash=''; return; }
  if (pdp.id!==id) pdp = {id, qty:1, variant:p.variants?p.variants[1]:'', img:0, fbt:Object.fromEntries(p.xs.map(x=>[x,true]))};
  document.title = `${p.name} — Dabadeal`;
  track('ViewContent',{content_ids:[p.sku],value:p.price,currency:'MAD'});
  const tiers=[1,2,3].map(q=>({q, tot:p.price+(q-1)*tierUnit(p), cmp:p.compare*q}));
  app.innerHTML = `
  <div class="container">
    <div class="crumbs"><a href="#" data-go="home">الرئيسية</a> / <a href="#" data-cat="${p.cat}">${p.catL}</a> / ${p.name}</div>
    <div class="pdp">
      <div class="gal">
        <div class="main"><img id="mainImg" src="${W(p.img[pdp.img])}" srcset="${S(p.img[pdp.img])} 400w, ${W(p.img[pdp.img])} 800w" sizes="(max-width:980px) 92vw, 560px" alt="${p.name}" width="800" height="800" fetchpriority="high"><span class="bd-off">-${off(p)}%<small>عرض الشتا</small></span></div>
        ${p.img.length>1?`<div class="thumbs">${p.img.map((s,i)=>`<button class="${i===pdp.img?'on':''}" data-thumb="${i}"><img src="${S(s)}" alt="" width="74" height="74" loading="lazy" decoding="async"></button>`).join('')}</div>`:''}
      </div>
      <div class="pinfo">
        <span class="cat">${p.catL} • ${p.badge}</span>
        <h1 class="h">${p.name}</h1>
        <p class="hook">${p.hook}</p>
        <div class="price"><span class="now">${fmt(p.price)}</span><s>${fmt(p.compare)}</s><span class="save">وفر ${fmt(p.compare-p.price)}</span></div>
        <p class="lead">${p.lead}</p>
        <ul class="bullets">${p.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>

        ${p.variants?`<div class="box-h">المقاس <small>محتارة؟ غادي نعاونوك فالتليفون</small></div><div class="variants">${p.variants.map(v=>`<button class="${v===pdp.variant?'on':''}" data-variant="${v}">${v}</button>`).join('')}</div>`:''}

        <div class="box-h">اختار العرض ديالك <small>-20٪ على كل حبة زايدة</small></div>
        <div class="tiers">
          ${tiers.map(t=>`<div class="tier ${pdp.qty===t.q?'on':''}" data-tier="${t.q}">
            ${t.q===2?'<span class="tag o">الأكثر طلبا 🔥</span>':''}${t.q===3?'<span class="tag">أحسن توفير</span>':''}
            <span class="radio"></span>
            <div class="t"><b>${t.q===1?'حبة وحدة':t.q===2?'جوج حبات':'3 حبات'}</b><span>${t.q===1?'التوصيل مجاني':t.q===2?'وحدة ليك ووحدة هدية • وفر '+fmt(t.cmp-t.tot):'للعائلة كاملة • وفر '+fmt(t.cmp-t.tot)}</span></div>
            <div class="p"><b>${fmt(t.tot)}</b><s>${fmt(t.cmp)}</s></div>
          </div>`).join('')}
        </div>

        <form class="qf" id="qf" novalidate>
          <div class="qf-h">${ICON.cash}<div><b>اطلب دابا وخلص ملي توصلك</b><span>عمر المعلومات ونعيطو ليك نأكدو</span></div></div>
          ${fieldsHTML('q')}
          <button type="submit" class="btn btn-o btn-block btn-col" id="buyNow" style="font-size:19px;padding:15px"><span>أكد الطلب • <span id="qTot">${fmt(pdpSelectionTotal())}</span></span><span class="sub">الخلاص عند الاستلام • التوصيل مجاني</span></button>
          <button type="button" class="btn btn-ghost btn-block" id="addCart">أو زيدو للسلة وكمل التسوق</button>
        </form>
        <div class="ship-eta">🚚 ${etaText()}</div>
        <div class="trustrow">
          <div>${ICON.cash}خلص ملي توصلك</div>
          <div>${ICON.truck}توصيل مجاني</div>
          <div>${ICON.swap}استبدال إلا كان عيب</div>
        </div>

        <div class="fbt" id="fbt"></div>
      </div>
    </div>
  </div>

  <section class="pd-sec"><div class="container">
    <div class="angle">
      <div><h2 class="h">${p.angleT}</h2><p>${p.angleP}</p>
        <a class="btn btn-o" href="#" data-scroll="top" style="margin-top:16px">بغيتو دابا — ${fmt(p.price)}</a></div>
      <img src="${W(p.img[1]||p.img[0])}" alt="" width="800" height="800" loading="lazy" decoding="async">
    </div>
  </div></section>

  <section class="pd-sec"><div class="container">
    <h2 class="h">واش كتعرف <span class="o">هاد المشاكل</span>؟</h2>
    <div class="pains">${p.pains.map(x=>`<div>${x}</div>`).join('')}</div>
  </div></section>

  <section class="pd-sec"><div class="container">
    <h2 class="h">علاش <span class="o">غادي تبغيه</span></h2>
    <div class="feats">${p.feats.map(f=>`<div class="feat"><div class="ic">${f[0]}</div><h3>${f[1]}</h3><p>${f[2]}</p></div>`).join('')}</div>
  </div></section>

  <section class="pd-sec"><div class="container" style="max-width:860px">
    <h2 class="h">التفاصيل</h2>
    <div class="specs">${p.specs.map(s=>`<div><span>${s[0]}</span><b>${s[1]}</b></div>`).join('')}</div>
    ${p.notice?`<div class="notice">⚠️ ${p.notice}</div>`:''}
  </div></section>

  <section class="pd-sec faq"><div class="container" style="max-width:860px">
    <h2 class="h">أسئلة على <span class="o">هاد المنتوج</span></h2>
    ${p.faq.map(f=>`<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('')}
    <details><summary>واش كنخلص قبل؟</summary><p>لا، كتخلص كاش ملي توصلك السلعة.</p></details>
    <details><summary>شحال كياخد التوصيل؟</summary><p>بين 24 و72 ساعة، والتوصيل مجاني.</p></details>
  </div></section>

  <section class="pd-sec" style="background:var(--sand)"><div class="container">
    <div class="sec-h"><h2 class="h">حتى هادو <span class="o">كيطلبوهم بزاف</span></h2></div>
    <div class="grid">${P.filter(x=>x.id!==p.id).sort((a,b)=>(p.xs.includes(b.id)-p.xs.includes(a.id))).slice(0,4).map(cardHTML).join('')}</div>
  </div></section>`;
  renderFBT(); renderSATC(p);
}
function pdpSelectionTotal(){ const p=byId(pdp.id); return p.price+(pdp.qty-1)*tierUnit(p); }
function renderFBT(){
  const p=byId(pdp.id), box=$('#fbt'); if(!box) return;
  const items=[p,...p.xs.map(byId)];
  const sel=p.xs.filter(x=>pdp.fbt[x]);
  const tot=p.price+sel.reduce((s,x)=>s+bundleUnit(byId(x)),0);
  const cmp=p.compare+sel.reduce((s,x)=>s+byId(x).compare,0);
  box.innerHTML = `<h3>كيشريوهم مع بعض <span class="o">ب -15٪</span></h3>
    ${items.map((it,i)=>`<div class="fbt-row" ${i?`data-fbt="${it.id}"`:''} style="${i?'cursor:pointer':''}">
      <span class="cb ${i===0||pdp.fbt[it.id]?'on':''} ${i===0?'lock':''}"></span>
      <img src="${S(it.img[0])}" alt="" width="58" height="58" loading="lazy" decoding="async">
      <div class="t">${i===0?'هاد المنتوج':''} ${it.name}<small>${i===0?'':it.short}</small></div>
      <div class="p">${fmt(i===0?it.price:bundleUnit(it))}${i?`<s>${fmt(it.price)}</s>`:''}</div>
    </div>`).join('')}
    <div class="fbt-total"><span>المجموع</span><span><b>${fmt(tot)}</b><s>${fmt(cmp)}</s></span></div>
    <button class="btn btn-k btn-block" id="fbtAdd" ${sel.length?'':'disabled style="opacity:.5"'}>زيد ${sel.length+1} منتوجات للسلة</button>`;
}
function renderSATC(p){
  $('#satc').innerHTML = `<div class="container in">
    <img src="${S(p.img[0])}" alt="" width="74" height="74" decoding="async">
    <div class="t"><b>${p.name}</b><span>${fmt(pdpSelectionTotal())}</span></div>
    <button class="btn btn-o" id="satcBuy">اطلب دابا</button></div>`;
}

/* =================== DRAWER (cart) =================== */
function renderDrawer(){
  const t=totals(); const left=Math.max(0,CONFIG.GIFT_THRESHOLD-t.sub);
  const inCart=new Set(cart.map(l=>l.id));
  const recos=[...new Set(cart.flatMap(l=>byId(l.id).xs).concat(['pieds','brosse','canne']))].filter(id=>!inCart.has(id)).slice(0,4);
  $('#drawer').innerHTML = `
   <div class="dh"><h3>السلة ديالك (${t.items})</h3><button class="x" data-close>×</button></div>
   ${cart.length?`<div class="prog">${left>0?`باقي ليك <span class="o">${fmt(left)}</span> وتاخد <b>-10٪</b> على الطلب كامل 🎁`:'🎉 مبروك! ربحتي <b>-10٪</b> على الطلب كامل'}<div class="bar"><i style="width:${Math.min(100,t.sub/CONFIG.GIFT_THRESHOLD*100)}%"></i></div></div>`:''}
   <div class="dbody">
     ${cart.length?cart.map(l=>{const p=byId(l.id);return `<div class="line">
        <img src="${S(p.img[0])}" alt="" width="74" height="74" decoding="async">
        <div class="t"><b>${p.name}</b>
          ${l.variant?`<small>المقاس: ${l.variant}</small><br>`:''}
          ${l.mode==='bundle'?'<span class="dl">-15٪ عرض الباك</span>':l.mode==='bump'||l.mode==='upsell'?'<span class="dl">-30٪ عرض خاص</span>':l.qty>1?'<span class="dl">-20٪ على الحبة الزايدة</span>':''}
          <div><span class="qty"><button data-q="${l.key}" data-d="1">+</button><span>${l.qty}</span><button data-q="${l.key}" data-d="-1">−</button></span>
          <button class="rm" data-rm="${l.key}">حيد</button></div>
        </div>
        <div class="p">${fmt(lineTotal(l))}<s>${fmt(p.compare*l.qty)}</s></div>
      </div>`}).join(''):`<div class="empty">السلة خاوية 🛒<br><br><a class="btn btn-o" href="#" data-go="home" data-close>شوف المنتوجات</a></div>`}
     ${cart.length&&recos.length?`<div class="xs"><h4>زيدهم مع الطلب ✨</h4><div class="xs-row">${recos.map(id=>{const p=byId(id);return `<div class="xs-card"><img src="${S(p.img[0])}" alt="" width="74" height="74" decoding="async"><div><b>${p.name}</b><span class="pp">${fmt(p.price)}</span><button data-xs="${id}">+ زيد</button></div></div>`}).join('')}</div></div>`:''}
   </div>
   ${cart.length?`<div class="df">
     <div class="sum">
       <div><span>المجموع</span><span>${fmt(t.sub)}</span></div>
       ${t.gift?`<div class="disc"><span>هدية -10٪</span><span>- ${fmt(t.gift)}</span></div>`:''}
       <div><span>التوصيل</span><span class="o" style="font-weight:800">مجاني</span></div>
       <div class="tot"><span>الإجمالي</span><b>${fmt(t.total)}</b></div>
       <div class="disc" style="justify-content:center">وفرتي ${fmt(t.saved)} 🔥</div>
     </div>
     <a class="btn btn-o btn-block btn-col" href="#checkout" data-close>كمل الطلب<span class="sub">الخلاص عند الاستلام</span></a>
   </div>`:''}`;
}
function openDrawer(){ renderDrawer(); $('#drawer').classList.add('on'); $('#scrim').classList.add('on'); }
function closeDrawer(){ $('#drawer').classList.remove('on'); $('#scrim').classList.remove('on'); }

/* =================== FORMS (shared) =================== */
const CITIES=['الدار البيضاء','الرباط','سلا','تمارة','القنيطرة','المحمدية','فاس','مكناس','مراكش','طنجة','تطوان','أكادير','وجدة','الجديدة','آسفي','بني ملال','خريبكة','سطات','برشيد','الناظور','تازة','العرائش','خنيفرة','الحسيمة','ورزازات','الراشيدية','العيون','الداخلة','إنزكان','تيزنيت','الصويرة','القصر الكبير'];
let saved={}; try{ saved=JSON.parse(localStorage.getItem('dd_cust')||'{}'); }catch(e){}
const esc=v=>(v||'').replace(/"/g,'&quot;');
function fieldsHTML(px){
  return `<div class="f" id="${px}-f-name"><label for="${px}-name">الاسم الكامل</label><input id="${px}-name" autocomplete="name" placeholder="مثلا: محمد العلوي" value="${esc(saved.name)}"><div class="err">دخل الاسم والنسب</div></div>
  <div class="f" id="${px}-f-phone"><label for="${px}-phone">رقم الهاتف</label><input id="${px}-phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="06XXXXXXXX" dir="ltr" style="text-align:right" value="${esc(saved.phone)}"><div class="err">الرقم خاصو 10 أرقام ويبدا بـ 05، 06 ولا 07</div></div>
  <div class="f" id="${px}-f-city"><label for="${px}-city">المدينة</label><input id="${px}-city" list="cities" autocomplete="address-level2" placeholder="الدار البيضاء، الرباط، فاس…" value="${esc(saved.city)}"><div class="err">دخل المدينة</div></div>
  <div class="f" id="${px}-f-address"><label for="${px}-address">العنوان الكامل</label><textarea id="${px}-address" autocomplete="street-address" rows="2" placeholder="الحي، الزنقة، رقم الدار، شي علامة قريبة…">${saved.address||''}</textarea><div class="err">دخل العنوان باش يوصلك الليفرور بلا مشاكل</div></div>`;
}
function readFields(px){
  const v=id=>$('#'+px+'-'+id).value.trim();
  const f={name:v('name'),phone:normPhone(v('phone')),city:v('city'),address:v('address')};
  const chk=(id,ok)=>{ $('#'+px+'-f-'+id).classList.toggle('bad',!ok); return ok; };
  const ok=[chk('name',f.name.split(/\s+/).length>=2&&f.name.length>=5),chk('phone',/^0[567]\d{8}$/.test(f.phone)),chk('city',f.city.length>=2),chk('address',f.address.length>=6)].every(Boolean);
  if(!ok){ const el=document.querySelector('.f.bad input,.f.bad textarea'); el&&el.focus(); return null; }
  return f;
}
function placeOrder(list,f){
  const t=totals(list), id='DD'+Date.now().toString().slice(-7);
  saved=f; try{ localStorage.setItem('dd_cust',JSON.stringify(f)); }catch(e){}
  lastOrder={id,date:new Date().toISOString(),...f,items:list.map(l=>({sku:byId(l.id).sku,name:byId(l.id).name,qty:l.qty,variant:l.variant,mode:l.mode,line:lineTotal(l)})),subtotal:t.sub,discount:t.gift,total:t.total,source:new URLSearchParams(location.search).get('utm_source')||'direct',upsell:null};
  sendOrder({type:'order',...lastOrder});
  track('Purchase',{value:t.total,currency:'MAD',num_items:t.items});
  location.hash='merci';
}

/* =================== CHECKOUT =================== */
let bumpOn=false;
function bumpProduct(){
  const ids=new Set(cart.map(l=>l.id));
  const cands=[...new Set(cart.flatMap(l=>byId(l.id).xs).concat(['pieds','brosse']))].filter(id=>!ids.has(id));
  return byId(cands[0]||'');
}
function renderCheckout(){
  if(!cart.length){ location.hash=''; return; }
  document.title='كمل الطلب — Dabadeal';
  const t=totals(); track('InitiateCheckout',{value:t.total,currency:'MAD',num_items:t.items});
  const bp = bumpProduct();
  app.innerHTML = `<div class="container"><div class="co">
    <div class="card-co">
      <h1 class="h">كمل الطلب ديالك</h1>
      <p style="color:var(--mut);font-weight:600">عمر المعلومات ديالك، وغادي نعيطو ليك باش نأكدو قبل الإرسال.</p>
      <form id="coForm" novalidate>
        ${fieldsHTML('c')}
        ${bp?`<div class="ob" id="bump">
          <span class="cb ${bumpOn?'on':''}"></span>
          <img src="${S(bp.img[0])}" alt="" width="64" height="64" decoding="async">
          <div class="t"><b>زيد ${bp.name}</b><span>عرض كيبان غير هنا: <em>${fmt(Math.round(bp.price*(1-CONFIG.ORDER_BUMP_DISCOUNT)))}</em> بلاصت ${fmt(bp.price)} — فنفس الكولي</span></div>
        </div>`:''}
        <div class="cod">${ICON.cash}<div><b>الدفع عند الاستلام</b><span>كتخلص كاش للليفرور ملي توصلك السلعة</span></div></div>
        <button class="btn btn-o btn-block btn-col" style="margin-top:14px;font-size:19px;padding:16px" type="submit" id="coBtn"><span>أكد الطلب • <span id="coTot">${fmt(totals().total)}</span></span><span class="sub">ما كتخلص حتى والو دابا</span></button>
        <div class="secure">${ICON.lock} المعلومات ديالك محمية وكتستعمل غير للتوصيل</div>
      </form>
    </div>
    <div class="card-co sumcard" id="coSum"></div>
  </div></div>`;
  renderCoSummary();
}
function coList(){ const l=[...cart]; const bp=bumpProduct(); if(bumpOn&&bp) l.push({key:bp.id+'|bump|',id:bp.id,qty:1,variant:'',mode:'bump'}); return l; }
function renderCoSummary(){
  const list=coList(), t=totals(list);
  $('#coSum').innerHTML = `<h3 style="font-size:18px;font-weight:800;margin-bottom:6px">ملخص الطلب</h3>
    ${list.map(l=>{const p=byId(l.id);return `<div class="mini"><div class="im"><img src="${S(p.img[0])}" alt="" width="74" height="74" decoding="async"><span class="q">${l.qty}</span></div><div class="t">${p.name}${l.variant?` <small style="color:var(--mut)">(${l.variant})</small>`:''}${l.mode!=='normal'?' <small class="o">عرض خاص</small>':''}</div><div class="p">${fmt(lineTotal(l))}</div></div>`}).join('')}
    <div class="sum" style="margin-top:10px">
      <div><span>المجموع</span><span>${fmt(t.sub)}</span></div>
      ${t.gift?`<div class="disc"><span>هدية -10٪</span><span>- ${fmt(t.gift)}</span></div>`:''}
      <div><span>التوصيل</span><span class="o" style="font-weight:800">مجاني</span></div>
      <div class="tot"><span>الإجمالي</span><b>${fmt(t.total)}</b></div>
      <div class="disc" style="justify-content:center">وفرتي ${fmt(t.saved)} 🔥</div>
    </div>
    <a href="#" data-opencart style="display:block;text-align:center;font-weight:800;font-size:14px;text-decoration:underline;margin-top:6px">بدل السلة</a>`;
  const ct=$('#coTot'); if(ct) ct.textContent=fmt(t.total);
}
function normPhone(v){ let d=(v||'').replace(/[^\d+]/g,''); if(d.startsWith('+212')) d='0'+d.slice(4); else if(d.startsWith('00212')) d='0'+d.slice(5); else if(d.startsWith('212')&&d.length===12) d='0'+d.slice(3); return d; }
function sendOrder(payload){
  if(!CONFIG.ORDER_WEBHOOK) return;
  try{ fetch(CONFIG.ORDER_WEBHOOK,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify(payload)}); }catch(e){}
}
function submitCheckout(e){
  e.preventDefault(); const f=readFields('c'); if(!f) return;
  const list=coList(); cart=[]; bumpOn=false; save(); renderCount(); placeOrder(list,f);
}
function submitQuick(e){
  e.preventDefault(); const f=readFields('q'); if(!f) return;
  placeOrder([{key:pdp.id+'|normal|'+pdp.variant,id:pdp.id,qty:pdp.qty,variant:pdp.variant,mode:'normal'}],f);
}
/* =================== THANK YOU + POST-PURCHASE UPSELL =================== */
let puTimer=null;
function renderThanks(){
  if(!lastOrder){ location.hash=''; return; }
  document.title='شكرا — Dabadeal';
  const ids=new Set(lastOrder.items.map(i=>P.find(p=>p.sku===i.sku).id));
  const cand=[...new Set([...ids].flatMap(id=>byId(id).xs).concat(['pieds','brosse','canne']))].find(id=>!ids.has(id));
  const up=byId(cand); const upPrice=up?Math.round(up.price*(1-CONFIG.POST_UPSELL_DISCOUNT)):0;
  const waMsg=encodeURIComponent(`سلام، الطلب ديالي رقم ${lastOrder.id}\nالمجموع: ${fmt(lastOrder.total)}\nالاسم: ${lastOrder.name}\nالمدينة: ${lastOrder.city}`);
  app.innerHTML = `<div class="container"><div class="ty">
    <div class="ok">${ICON.check}</div>
    <h1 class="h">شكرا ${lastOrder.name.split(' ')[0]}! الطلب ديالك توصلنا</h1>
    <p>رقم الطلب: <span class="num">${lastOrder.id}</span><br>غادي نعيطو ليك قريب على <b dir="ltr">${lastOrder.phone}</b> باش نأكدو. عافاك جاوب 🙏</p>
    ${up&&!lastOrder.upsell?`<div class="pu" id="pu">
      <div class="hd"><b>⚡ عرض واحد، غير دابا</b><span class="timer" id="puT">10:00</span></div>
      <div class="row"><img src="${S(up.img[0])}" alt="" width="110" height="110" decoding="async">
        <div><h3>${up.name}</h3><p>${up.short}. نزيدوه ليك فنفس الكولي، بلا ما تعاود تعمر والو.</p>
          <div class="price"><span class="now">${fmt(upPrice)}</span><s>${fmt(up.price)}</s><span class="save">-30٪</span></div></div></div>
      <div class="acts">
        <button class="btn btn-o btn-block btn-col" id="puYes" data-up="${up.id}">إيه، زيدو للطلب ديالي<span class="sub">+${fmt(upPrice)} • الخلاص عند الاستلام</span></button>
        <button class="no" id="puNo">لا شكرا</button>
      </div></div>`:''}
    ${lastOrder.upsell?`<div class="pu" style="text-align:center"><b>✅ تزاد ${byId(lastOrder.upsell).name} للطلب ديالك</b></div>`:''}
    <div class="recap"><h3>الطلب ديالك</h3>
      ${lastOrder.items.map(i=>`<div class="mini"><div class="t">${i.qty} × ${i.name}${i.variant?' ('+i.variant+')':''}</div><div class="p">${fmt(i.line)}</div></div>`).join('')}
      <div class="sum"><div class="tot"><span>الإجمالي (خلص ملي توصلك)</span><b>${fmt(lastOrder.total)}</b></div></div>
      <p style="font-size:14px;margin-top:6px">📍 ${lastOrder.city} — ${lastOrder.address}</p>
    </div>
    ${CONFIG.WHATSAPP_NUMBER?`<a class="btn wa btn-block" style="margin-top:12px" href="https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${waMsg}">أكد حتى فالواتساب 💬</a>`:''}
    <a class="btn btn-ghost btn-block" style="margin-top:10px" href="#" data-go="home">رجع للمتجر</a>
  </div></div>`;
  if($('#puT')){ let s=600; clearInterval(puTimer); puTimer=setInterval(()=>{ s--; const el=$('#puT'); if(!el||s<=0){ clearInterval(puTimer); const pu=$('#pu'); if(pu&&s<=0) pu.remove(); return; } el.textContent=`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`; },1000); }
}

/* =================== ROUTER =================== */
function route(){
  const h=location.hash.replace('#','');
  if(h||!app.dataset.pre) delete app.dataset.pre;
  closeDrawer(); $('#satc').classList.remove('on');
  if(h.startsWith('p-')) renderPDP(h.slice(2));
  else if(h==='checkout') renderCheckout();
  else if(h==='merci') renderThanks();
  else if(app.dataset.pre){ delete app.dataset.pre; return; }
  else renderHome();
  window.scrollTo({top:0,behavior:'instant'});
}
window.addEventListener('hashchange',route);
window.addEventListener('scroll',()=>{
  const s=$('#satc'); const b=$('#buyNow'); if(!b){ s.classList.remove('on'); return; }
  s.classList.toggle('on', b.getBoundingClientRect().bottom<0);
},{passive:true});

/* =================== EVENTS =================== */
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-go],[data-cat],[data-scroll],[data-chip],[data-quick],[data-bundle],[data-thumb],[data-tier],[data-variant],[data-fbt],#fbtAdd,#buyNow,#addCart,#satcBuy,[data-close],[data-q],[data-rm],[data-xs],#bump,#puYes,#puNo,[data-opencart],#cartBtn,#scrim');
  if(!t) return;
  if(t.matches('[data-go]')){ e.preventDefault(); if(location.hash&&location.hash!=='#') location.hash=''; else route(); }
  if(t.matches('[data-cat]')){ e.preventDefault(); homeCat=t.dataset.cat; if(location.hash&&location.hash!=='#'){ location.hash=''; setTimeout(()=>document.getElementById('shop').scrollIntoView({behavior:'smooth'}),60);} else { renderHome(); document.getElementById('shop').scrollIntoView({behavior:'smooth'}); } }
  if(t.matches('[data-scroll]')){ e.preventDefault(); const id=t.dataset.scroll; if(id==='top'){ window.scrollTo({top:0,behavior:'smooth'}); return; } const go=()=>{ const el=document.getElementById(id); el&&el.scrollIntoView({behavior:'smooth'}); }; if(!document.getElementById(id)){ location.hash=''; setTimeout(go,80);} else go(); }
  if(t.matches('[data-chip]')){ homeCat=t.dataset.chip; const y=window.scrollY; renderHome(); window.scrollTo(0,y); }
  if(t.matches('[data-quick]')){ e.preventDefault(); addToCart(t.dataset.quick,1,{variant:(byId(t.dataset.quick).variants||[''])[1]||''}); openDrawer(); }
  if(t.matches('[data-bundle]')){ const ids=t.dataset.bundle.split(','); addToCart(ids[0],1); ids.slice(1).forEach(id=>addToCart(id,1,{mode:'bundle'})); openDrawer(); }
  if(t.matches('[data-thumb]')){ pdp.img=+t.dataset.thumb; {const m=$('#mainImg'),s0=byId(pdp.id).img[pdp.img]; m.srcset=`${S(s0)} 400w, ${W(s0)} 800w`; m.src=W(s0);} document.querySelectorAll('[data-thumb]').forEach(b=>b.classList.toggle('on',b===t)); }
  if(t.matches('[data-tier]')){ pdp.qty=+t.dataset.tier; document.querySelectorAll('[data-tier]').forEach(b=>b.classList.toggle('on',b===t)); renderSATC(byId(pdp.id)); $('#qTot').textContent=fmt(pdpSelectionTotal()); }
  if(t.matches('[data-variant]')){ pdp.variant=t.dataset.variant; document.querySelectorAll('[data-variant]').forEach(b=>b.classList.toggle('on',b===t)); }
  if(t.matches('[data-fbt]')){ pdp.fbt[t.dataset.fbt]=!pdp.fbt[t.dataset.fbt]; renderFBT(); }
  if(t.id==='fbtAdd'){ const p=byId(pdp.id); addToCart(p.id,1,{variant:pdp.variant}); p.xs.filter(x=>pdp.fbt[x]).forEach(x=>addToCart(x,1,{mode:'bundle'})); openDrawer(); }
  if(t.id==='satcBuy'){ const q=$('#qf'); q.scrollIntoView({behavior:'smooth',block:'center'}); setTimeout(()=>{ const n=$('#q-name'); if(n&&!n.value) n.focus({preventScroll:true}); },450); }
  if(t.id==='addCart'){ addToCart(pdp.id,pdp.qty,{variant:pdp.variant}); openDrawer(); }
  if(t.id==='cartBtn'||t.matches('[data-opencart]')){ e.preventDefault(); openDrawer(); }
  if(t.matches('[data-close]')||t.id==='scrim'){ closeDrawer(); }
  if(t.matches('[data-q]')){ const l=cart.find(x=>x.key===t.dataset.q); if(l) setQty(l.key,l.qty+(+t.dataset.d)); }
  if(t.matches('[data-rm]')){ setQty(t.dataset.rm,0); }
  if(t.matches('[data-xs]')){ addToCart(t.dataset.xs,1,{variant:(byId(t.dataset.xs).variants||[''])[1]||''}); renderDrawer(); toast('تزاد للسلة ✓'); }
  if(t.id==='bump'){ bumpOn=!bumpOn; t.querySelector('.cb').classList.toggle('on',bumpOn); renderCoSummary(); }
  if(t.id==='puYes'){ const up=byId(t.dataset.up); const price=Math.round(up.price*(1-CONFIG.POST_UPSELL_DISCOUNT));
    lastOrder.items.push({sku:up.sku,name:up.name,qty:1,variant:'',mode:'upsell',line:price}); lastOrder.total+=price; lastOrder.upsell=up.id;
    sendOrder({type:'upsell',order_id:lastOrder.id,sku:up.sku,name:up.name,price,new_total:lastOrder.total});
    track('Purchase',{value:price,currency:'MAD',num_items:1}); clearInterval(puTimer); renderThanks(); toast('تزاد للطلب ديالك ✓'); }
  if(t.id==='puNo'){ clearInterval(puTimer); $('#pu').remove(); }
});
document.addEventListener('submit',e=>{ if(e.target.id==='coForm') submitCheckout(e); if(e.target.id==='qf') submitQuick(e); });
if(CONFIG.WHATSAPP_NUMBER){ const a=document.createElement('a'); a.className='waf'; a.href='https://wa.me/'+CONFIG.WHATSAPP_NUMBER; a.setAttribute('aria-label','واتساب'); a.innerHTML='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7a11.6 11.6 0 0 1-4.5-4c-.4-.5-1-1.6-1-2.7s.6-1.7.8-1.9c.2-.2.5-.3.6-.3h.5c.1 0 .4 0 .6.4l.8 2c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.1.1.7-.1 1.3z"/></svg>'; document.body.appendChild(a); }
if(CONFIG.WHATSAPP_NUMBER) $('#ftWa').innerHTML=`<a href="https://wa.me/${CONFIG.WHATSAPP_NUMBER}">واتساب: +${CONFIG.WHATSAPP_NUMBER}</a>`;
$('#cities').innerHTML=CITIES.map(c=>`<option value="${c}">`).join('');
renderCount(); route();
