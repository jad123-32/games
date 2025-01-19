        // Canvas setup for stars
        const starCanvas = document.getElementById('starCanvas');
        const starCtx = starCanvas.getContext('2d');
        const particleCanvas = document.getElementById('particleCanvas');
        const particleCtx = particleCanvas.getContext('2d');

        // Set canvas sizes
        function resizeCanvases() {
            starCanvas.width = window.innerWidth;
            starCanvas.height = window.innerHeight;
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        }
        resizeCanvases();
        window.addEventListener('resize', resizeCanvases);

        // Stars setup
// Stars setup
const stars = [];
const numStars = 800;  // قللنا عدد النجوم لتجنب الازدحام

// إنشاء نجوم بأحجام وسرعات مختلفة
for (let i = 0; i < numStars; i++) {
    const size = Math.random();  // جعل الحجم أصغر
    const type = Math.random();  // لتحديد نوع النجم
    
    stars.push({
        x: Math.random() * starCanvas.width,
        y: Math.random() * starCanvas.height,
        size: type > 0.99 ? size * 2 : size * 1.1, // بعض النجوم أكبر قليلاً
        speed: Math.random() * 0.2 + 0.1,  // سرعة أبطأ
        brightness: Math.random() * 0.5 + 0.5,  // سطوع متغير
        twinkle: type > 0.98  // بعض النجوم ستومض
    });
}

function drawStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    
    stars.forEach(star => {
        // إضافة تأثير الوميض للنجوم المحددة
        if (star.twinkle) {
            star.brightness = 0.5 + Math.sin(Date.now() * 0.003) * 0.5;
        }

        // رسم النجمة بتأثير التوهج
        starCtx.beginPath();
        starCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        starCtx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        starCtx.fill();

        // إضافة توهج حول النجم
        const gradient = starCtx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 2
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.brightness * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        starCtx.fillStyle = gradient;
        starCtx.beginPath();
        starCtx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
        starCtx.fill();

        // تحريك النجوم
        star.y += star.speed;
        if (star.y > starCanvas.height) {
            star.y = 0;
            star.x = Math.random() * starCanvas.width;
        }
    });
    
    requestAnimationFrame(drawStars);
}

        // Particle system
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 3;
                this.speedX = (Math.random() - 0.5) * 2;
                this.speedY = (Math.random() - 0.5) * 2;
                this.life = 1.0;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= 0.02;
            }

            draw() {
                particleCtx.fillStyle = `rgba(255, 150, 0, ${this.life})`;
                particleCtx.beginPath();
                particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                particleCtx.fill();
            }
        }

        let particles = [];

        // Planets data with questions
        const planets = [
            {
                name: 'sun',
                image: 'xc.jpg',
                x: 500,
                y: 300,
                size: 100,
                info: "בעידן של התפתחות מתמשכת בטכנולוגיה ובחקר החלל, המחשב הקוונטי ממלא תפקיד מרכזי בשיפור היכולות המדעיות והטכנולוגיות שלנו. אחד היישומים המבטיחים הוא השימוש בו בתחנות חלל כמו שלנו . בזכות יכולתו לעבד נתונים במהירות עצומה ולפתור בעיות מורכבות בדרכים לא שגרתיות, המחשב הקוונטי עשוי לתרום להאצת חידושים מדעיים ולשיפור קבלת ההחלטות בזמן אמת." ,
                question: 'מהי חשיבות קיומו של מחשב קוונטי בתחנת החלל שלנו "Quantum"?',
                answers: [
                    'להכנת קפה מהר יותר במקרה של הפסקת חשמל',
                    'לשיפור עיבוד נתונים במהירות גבוהה יותר וניתוח בעיות מורכבות באופן מתקדם',
                    'לניבוי מועדי נפילת מטאוריטים',
                    'ליצירת שער זמן למסע בזמן'
                ],
                correct: 1
            },
            {
                name: 'mercury',
                image: 'OIP.jpg',
                x: 300,
                y: 200,
                size: 30,
                info: "בזמן שהטכנולוגיה ממשיכה להתפתח, מחשבים קוונטיים מציעים פוטנציאל עצום לשיפור התקשורת בין כדור הארץ לתחנות חלל. באמצעות הצפנה מתקדמת ושימוש בשזירה קוונטית, ניתן להבטיח אבטחת נתונים ברמה גבוהה ומהירות יוצאת דופן בהעברת מידע." ,
                question: 'האם מחשב קוונטי יכול לשפר את התקשורת בין כדור הארץ לתחנה?',
                answers: [
                    'כן, הצפנה מתקדמת ושזירה קוונטית מספקים אבטחה ומהירות יוצאת דופן',
                    'כן, מכיוון שהוא משתמש בגלי קול לתקשורת עם כדור הארץ',
                    'כן, משפר את איכות התקשורת באמצעות בינה מלאכותית בהתאם לרצון הצד השני',
                    'כן, מאפשר תקשורת עם התחנה בכל מקום ביקום'
                ],
                correct: 0
            },
            {
                name: 'venus',
                image: 'zis.jpg',
                x: 700,
                y: 150,
                size: 50,
                info: "בעת הפעלת מחשב קוונטי בחלל, קיימים מספר אתגרים ייחודיים שיש להתגבר עליהם כדי להבטיח את פעולתו התקינה. אחד האתגרים המרכזיים הוא שמירה על הסביבה האידיאלית לפעולת המחשב, הכוללת טמפרטורות נמוכות במיוחד, יציבות מערכתית, ומניעת רעידות תרמיות שעלולות לשבש את תפקודו." ,
                question: 'מהם האתגרים בתפעול מחשב קוונטי בחלל?',
                answers: [
                    'סיכון להתפוצצות המחשב אם ינסה לנתח תמונות של יצורים חייזריים בצבעים לא רגילים',
                    'שמירה על הסביבה האידיאלית לפעולתו, כמו טמפרטורות מתאימות ומניעת רעידות תרמיות',
                    'כניסה לחורים שחורים',
                    'חוסר קליטת Wi-Fi חזקה'
                ],
                correct: 1
            },
            {
                name: 'earth',
                image: 'swe.jpg',
                x: 400,
                y: 400,
                size: 60,
                info: "בתחום חקר החלל, יכולתו של מחשב קוונטי לחשב מסלולים מורכבים ברמת דיוק גבוהה במיוחד היא בעלת משמעות קריטית כמו התחנה שלנו. בתחנת החלל , מחשב קוונטי יכול לשפר את מערכות הניווט על ידי ביצוע חישובי מסלולים מורכבים בצורה מדויקת ויעילה, מה שתורם לחיסכון בדלק ובזמן, וכן משפר את הבטיחות והאמינות של המשימות החלליות." ,
                question: 'כיצד מחשב הקוונטי בתחנתנו "Quantum" יכול לשפר את מערכות הניווט החלליות?',
                answers: [
                    'מתכנת מחדש את המסלול כדי לקחת את האסטרונאוטים לטיול תיירותי בחלל',
                    'מחשב מסלולים מורכבים בדיוק גבוה יותר לחיסכון בדלק ובזמן',
                    'מבקש רשות מיצורים חייזריים לפני שינוי המסלול',
                    'קובע את הכיוונים בהתבסס על תנועת הכוכבים'
                ],
                correct: 1
            },
            {
                name: 'mars',
                image: 'zaw.jpg',
                x: 600,
                y: 500,
                size: 45,
                info: "כור גרעיני קטן נבדל מכור גרעיני קלאסי בעיקר בגודלו ובממדים הקומפקטיים שלו, המאפשרים התקנה ביחידה אחת. בנוסף, עלותו נמוכה יחסית לכור קלאסי, מה שהופך אותו לאופציה יעילה וגמישה לשימושים שונים, כולל באזורים מרוחקים או במתקנים קטנים כמו תחנות חלל או ספינות." ,
                question: 'מה מבדיל בין כור גרעיני קטן לכור גרעיני קלאסי?',
                answers: [
                    'בגודלו הקטן ועלותו הנמוכה יחסית, שניתן למקמו ביחידה אחת',
                    'ניתן להפעילו באמצעות סוללות במקום דלק גרעיני',
                    'ניתן לשאת אותו בתיק גב',
                    'פועל בשקט מוחלט ואינו מייצר רעש בזמן תגובה גרעינית'
                ],
                correct: 0
            },
            {
                name: 'jupiter',
                image: '1902948_0.jpg',
                x: 800,
                y: 300,
                size: 80,
                info: "מסלול GEO (Geostationary Earth Orbit) הוא מסלול בעל תכונות ייחודיות שהופכות אותו לשימושי במיוחד בתקשורת לוויינית ובמערכות חישה מרחוק. במסלול זה, הלוויין מסתובב סביב כדור הארץ באותה מהירות זוויתית כמו סיבוב כדור הארץ עצמו, מה שמאפשר לו להישאר מעל אותה נקודה יחסית על פני הקרקע. בנוסף, מסלול GEO תואם לחלוטין למישור קו המשווה, מה שמבטיח יציבות ויכולת כיסוי אופטימלית." ,
                question: 'מהן התכונות של מסלול GEO?',
                answers: [
                    'מסתובב באותה מהירות זוויתית כמו כדור הארץ',
                    'תואם לחלוטין למישור קו המשווה',
                    'רכבים במסלול זה יכולים לטוס לירח ולחזור תוך שעה',
                    'תשובות 1 ו-2 נכונות'
                ],
                correct: 3
            },
            {
                name: 'saturn',
                image: 'vbn.jpg',
                x: 200,
                y: 350,
                size: 70,
                info: "מסלול GEO (מסלול גיאוסטציונרי) מאפשר כיסוי יציב ורציף של אזורים נרחבים על פני כדור הארץ. כדי לכסות את כל כדור הארץ באמצעות לוויינים במסלול זה, יש צורך בשלוש תחנות בלבד, כאשר כל אחת מהן ממוקמת בזווית מתאימה לכיסוי של עד שליש משטח כדור הארץ. כך נוצר כיסוי מלא ורציף לכל כדור הארץ." ,
                question: 'כמה תחנות צריך כדי לכסות את כדור הארץ כולו במסלול GEO?',
                answers: [
                    'תחנה אחת מספיקה כי האות שלה חזק מספיק כדי לכסות את כל הגלקסיה',
                    '3 תחנות, כל אחת יכולה לכסות עד שליש משטח כדור הארץ',
                    '365 תחנות, אחת לכל יום בשנה',
                    'מספר בלתי מוגבל של תחנות כי האותות אובדים בחלל ללא גבולות'
                ],
                correct: 1
            },
            {
                name: 'uranos',
                image: 'أورانوس.jpg',
                x: 900,
                y: 450,
                size: 55,
                info: "שמירה על טמפרטורה יציבה בתחנת החלל  היא קריטית לתפקוד התקני של הציוד והמכשור, במיוחד כאשר מדובר בטכנולוגיות מתקדמות כמו מחשבים קוונטיים. בתחנה נעשה שימוש במערכת קירור מתקדמת המבוססת על צינורות חום, אשר מסייעים בהעברת חום יעילה מאזורים חמים לאזורים קרירים יותר, תוך ניצול תהליכים פיזיקליים לשמירה על יציבות תרמית." ,
                question: 'מהי הדרך המשמשת בתחנתנו ״Quantum" לקירור והעברת חום?',
                answers: [
                    'שימוש במאווררים ענקיים',
                    'העברת חום באמצעות קרני רנטגן',
                    'שימוש במערכת קירור דרך צינורות חום',
                    'שימוש במקררים מתקדמים'
                ],
                correct: 2
            },
            {
                name: 'neptune',
                image: 'to.jpg',
                x: 300,
                y: 600,
                size: 65,
                info: "תחנה גרעינית בחלל חייבת להתמודד עם אתגרים ייחודיים, כולל סכנת פגיעה מחלקיקים תועים כמו פסולת חלל או מטאורואידים קטנים. כדי להגן על עצמה, התחנה יכולה להשתמש בטכנולוגיות מתקדמות כמו שיגור קרן לייזר חזקה, שמאפשרת לפזר או להסיט חלקיקים תועים בטרם יגיעו למבנה התחנה ויגרמו לנזק." ,
                question: 'כיצד יכולה התחנה הגרעינית להגן על עצמה מפני חלקיקים תועים?',
                answers: [
                    'שיגור קרן לייזר חזקה',
                    'בניית קיר מפלדה מסביב לתחנה',
                    'שיגור טילים להשמדת סלעים חלליים',
                    'שימוש במגן מגנטי להדיפת חלקיקים'
                ],
                correct: 0
            },
            {
                name: 'pluto',
                image: 'R.jpg',
                x: 700,
                y: 650,
                size: 25,
                info: "מערכת ההגנה העצמית באמצעות לייזר פועלת באמצעות שילוב של טכנולוגיות מתקדמות, המאפשרות גילוי, מעקב ונטרול איומים. המערכת מזהה איומים פוטנציאליים, כמו חלקיקים תועים או כלי טיס עוינים, בעזרת חיישנים מתקדמים. לאחר הזיהוי, היא משתמשת בקרן לייזר ממוקדת ועוצמתית כדי לפזר, להסיט או להשמיד את האיום לפני שהוא גורם לנזק למבנים או למערכות." ,
                question: 'כיצד פועל מערכת ההגנה העצמית באמצעות לייזר?',
                answers: [
                    'הלייזר יכול להשפיע על המטרה מרחוק ללא כל השפעה על הסביבה',
                    'מערכת ההגנה העצמית באמצעות לייזר פועלת רק נגד טילים',
                    'מערכת ההגנה העצמית היא אוסף טכנולוגיות להגנה על אנשים או מערכות מפני איומים',
                    'משתמש בלייזר להשמדת מטוסים עוינים באופן מיידי ברגע שהם מזוהים'
                ],
                correct: 2
            }
        ];

        // Create planets
        planets.forEach((planet, index) => {
            const planetElement = document.createElement('div');
            planetElement.classList.add('planet');
            planetElement.style.backgroundImage = `url(${planet.image})`;
            planetElement.style.left = `${planet.x}px`;
            planetElement.style.top = `${planet.y}px`;
            planetElement.style.width = `${planet.size}px`;
            planetElement.style.height = `${planet.size}px`;
            
            planetElement.addEventListener('click', () => {
                showQuestion(index);
            });
            
            document.getElementById('solar-system').appendChild(planetElement);
        });
        function showThankYouMessage() {
            // إضافة خلفية للرسالة
            const messageBackground = document.createElement('div');
            messageBackground.style.position = 'fixed';
            messageBackground.style.top = '0';
            messageBackground.style.left = '0';
            messageBackground.style.width = '100%';
            messageBackground.style.height = '100%';
            messageBackground.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
            messageBackground.style.zIndex = '1000';
            messageBackground.style.display = 'flex';
            messageBackground.style.justifyContent = 'center';
            messageBackground.style.alignItems = 'center';
            messageBackground.style.backdropFilter = 'blur(5px)';
            document.body.appendChild(messageBackground);
        
            // إنشاء حاوية للرسالة والمفرقعات
            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.gap = '20px';
            messageBackground.appendChild(container);
        
            // إضافة رسالة الشكر
            const thankYouMessage = document.createElement('div');
            thankYouMessage.innerText = 'כל הכבוד, סיימת את המשחק ';
            thankYouMessage.style.color = 'white';
            thankYouMessage.style.fontSize = '24px';
            thankYouMessage.style.fontWeight = 'bold';
            thankYouMessage.style.textAlign = 'center';
            thankYouMessage.style.padding = '20px';
            thankYouMessage.style.borderRadius = '10px';
            thankYouMessage.style.textShadow = '0 2px 4px rgba(0,0,0,0.2)';
            container.appendChild(thankYouMessage);
        
            // إضافة كانفاس المفرقعات
            const fireworksCanvas = document.createElement('canvas');
            fireworksCanvas.width = 200;  // عرض أصغر للمفرقعات
            fireworksCanvas.height = 200; // ارتفاع أصغر للمفرقعات
            fireworksCanvas.style.backgroundColor = 'transparent';
            container.appendChild(fireworksCanvas);
            
            // تعيين سياق الرسم للمفرقعات
            const ctx = fireworksCanvas.getContext('2d');
            
            class Particle {
                constructor(x, y) {
                    this.x = x;
                    this.y = y;
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 3 + 1;
                    this.vx = Math.cos(angle) * speed;
                    this.vy = Math.sin(angle) * speed;
                    this.life = 100;
                    this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
                }
        
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.vy += 0.05; // جاذبية خفيفة
                    this.life -= 1;
                }
        
                draw(ctx) {
                    ctx.fillStyle = this.color;
                    ctx.globalAlpha = this.life / 100;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            }
        
            class Firework {
                constructor() {
                    this.x = fireworksCanvas.width / 2;
                    this.y = fireworksCanvas.height;
                    this.particles = [];
                    for (let i = 0; i < 30; i++) {
                        this.particles.push(new Particle(
                            fireworksCanvas.width / 2,
                            fireworksCanvas.height / 2
                        ));
                    }
                }
        
                update() {
                    this.particles.forEach(particle => particle.update());
                    this.particles = this.particles.filter(particle => particle.life > 0);
                }
        
                draw(ctx) {
                    this.particles.forEach(particle => particle.draw(ctx));
                }
            }
        
            let fireworks = [];
        
            function startFireworks() {
                const fireworksInterval = setInterval(() => {
                    fireworks.push(new Firework());
                }, 500);
        
                function animate() {
                    ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
                    fireworks.forEach(firework => {
                        firework.update();
                        firework.draw(ctx);
                    });
                    fireworks = fireworks.filter(firework => firework.particles.length > 0);
                    requestAnimationFrame(animate);
                }
        
                animate();
                return fireworksInterval;
            }
        
            const fireworksInterval = startFireworks();
        
            // إزالة الرسالة والخلفية بعد 5 ثوانٍ
            setTimeout(() => {
                messageBackground.remove();
                clearInterval(fireworksInterval);
            }, 5000);
        }

        // Question system
        function showPlanetInfo(planetIndex) {
            const planet = planets[planetIndex];
            const questionBox = document.getElementById('question-box');
            
            questionBox.innerHTML = `
                <h2>${planet.name.toUpperCase()}</h2>
                <p style="margin-bottom: 20px; line-height: 1.6;">${planet.info}</p>
                <button id="show-question" style="
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;">
                    عرض السؤال
                </button>
            `;
            
            questionBox.style.display = 'block';
            
            document.getElementById('show-question').addEventListener('click', () => {
                showQuestion(planetIndex);
            });
        }
        
        function showQuestion(planetIndex) {
            const planet = planets[planetIndex];
            const questionBox = document.getElementById('question-box');
            
            // عرض السؤال وخيارات الإجابة
            questionBox.innerHTML = `
                <h2>${planet.name.toUpperCase()}</h2>
                <p style="margin-bottom: 20px;">${planet.question}</p>
                <div id="answer-options"></div>
            `;
            
            const answerOptions = document.getElementById('answer-options');
            planet.answers.forEach((answer, index) => {
                const button = document.createElement('button');
                button.className = 'answer-option';
                button.textContent = answer;
                
                button.onclick = () => {
                    document.querySelectorAll('.answer-option').forEach(btn => {
                        btn.classList.remove('selected');
                    });
                    button.classList.add('selected');
                    
                    if (index === planet.correct) {
                        setTimeout(() => {
                            if (planet.name === 'pluto') {
                                showThankYouMessage(); // عرض رسالة شكر وتأثير المفرقعات لسؤال بلوتو
                            }
                            alert('תשובה נכונה!');
                            questionBox.style.display = 'none';
                        }, 500);
                    } else {
                        alert('תשובה לא נכונה תנסה שוב');
                    }
                };
                
                answerOptions.appendChild(button);
            });
            
            questionBox.style.display = 'block';
        }
        
        // تحديث معالج النقر على الكواكب
        planets.forEach((planet, index) => {
            const planetElement = document.createElement('div');
            planetElement.classList.add('planet');
            planetElement.style.backgroundImage = `url(${planet.image})`;
            planetElement.style.left = `${planet.x}px`;
            planetElement.style.top = `${planet.y}px`;
            planetElement.style.width = `${planet.size}px`;
            planetElement.style.height = `${planet.size}px`;
            
            planetElement.addEventListener('click', () => {
                showPlanetInfo(index);  // تغيير هذا السطر من showQuestion إلى showPlanetInfo
            });
            
            document.getElementById('solar-system').appendChild(planetElement);
        });
        // Space station controls
        const spaceStation = document.getElementById('space-station');

        // Add the "QUANTOM" label above the space station
        const quantomLabel = document.createElement('div');
        quantomLabel.innerText = 'QUANTOM';
        quantomLabel.style.position = 'absolute';
        quantomLabel.style.color = 'white'; // Or any color you prefer
        quantomLabel.style.fontSize = '20px'; // Adjust font size
        quantomLabel.style.fontWeight = 'bold';
        document.body.appendChild(quantomLabel);
        
        let stationX = 500;
        let stationY = 400;
        spaceStation.style.backgroundImage = 'url("zxxqw.jpg")';
        
        const keys = {};
        let lastTime = 0;
        const moveSpeed = 300; // pixels per second
        
        document.addEventListener('keydown', (e) => {
            keys[e.key.toLowerCase()] = true;
        });
        
        document.addEventListener('keyup', (e) => {
            keys[e.key.toLowerCase()] = false;
        });
        
        function updateLabelPosition() {
            quantomLabel.style.left = `${stationX}px`;
            quantomLabel.style.top = `${stationY - 30}px`; // Position it above the space station
        }
        
        function createEngineParticles() {
            for (let i = 0; i < 3; i++) {
                particles.push(new Particle(
                    stationX + 30,
                    stationY + 30
                ));
            }
        }
        
        // Call `updateLabelPosition` whenever the station moves
        function updatePosition(deltaTime) {
            const distance = moveSpeed * deltaTime;
        
            if (keys['arrowup']) stationY -= distance;
            if (keys['arrowdown']) stationY += distance;
            if (keys['arrowleft']) stationX -= distance;
            if (keys['arrowright']) stationX += distance;
        
            spaceStation.style.left = `${stationX}px`;
            spaceStation.style.top = `${stationY}px`;
        
            updateLabelPosition(); // Keep the label in sync
        }
        
        function gameLoop(timestamp) {
            const deltaTime = (timestamp - lastTime) / 1000;
            lastTime = timestamp;
        
            updatePosition(deltaTime);
        
            requestAnimationFrame(gameLoop);
        }
        function updateParticles() {
            particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            particles = particles.filter(particle => {
                particle.update();
                if (particle.life > 0) {
                    particle.draw();
                    return true;
                }
                return false;
            });
        }

        function drawStars() {
            starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
            starCtx.fillStyle = 'white';
            
            stars.forEach(star => {
                starCtx.beginPath();
                starCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                starCtx.fill();
                
                star.y += star.speed;
                if (star.y > starCanvas.height) {
                    star.y = 0;
                    star.x = Math.random() * starCanvas.width;
                }
            });
        }

        function gameLoop(currentTime) {
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            let moveX = 0;
            let moveY = 0;

            if (keys['w']) moveY -= 1;
            if (keys['s']) moveY += 1;
            if (keys['a']) moveX -= 1;
            if (keys['d']) moveX += 1;

            // Normalize diagonal movement
            if (moveX !== 0 && moveY !== 0) {
                moveX *= 0.707;
                moveY *= 0.707;
            }

            stationX += moveX * moveSpeed * deltaTime;
            stationY += moveY * moveSpeed * deltaTime;

            // Boundary checks
            stationX = Math.max(0, Math.min(window.innerWidth - 60, stationX));
            stationY = Math.max(0, Math.min(window.innerHeight - 60, stationY));

            spaceStation.style.left = `${stationX}px`;
            spaceStation.style.top = `${stationY}px`;

            if (moveX !== 0 || moveY !== 0) {
                createEngineParticles();
            }

            drawStars();
            updateParticles();
            requestAnimationFrame(gameLoop);
        }

        // Start the game loop
        requestAnimationFrame(gameLoop);