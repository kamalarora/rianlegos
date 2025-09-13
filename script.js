document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const ctaButton = document.querySelector('.cta-button');
    const setCards = document.querySelectorAll('.set-card');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResultsDisplay = document.getElementById('search-results-display');
    const searchResultsTitle = document.getElementById('search-results-title');
    const searchResultsGrid = document.getElementById('search-results-grid');
    const closeSearchBtn = document.getElementById('close-search-results');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    ctaButton.addEventListener('click', function() {
        const setsSection = document.getElementById('sets');
        setsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    setCards.forEach(card => {
        card.addEventListener('click', function() {
            const setName = this.querySelector('h3').textContent;
            showSetDetails(setName);
        });
    });

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 200);
        });
    });

    function showSetDetails(setName) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>${setName}</h2>
                <div class="modal-image"></div>
                <p>This amazing ${setName} set includes hundreds of pieces and hours of building fun!</p>
                <div class="set-features">
                    <h3>Features:</h3>
                    <ul>
                        <li>Premium quality LEGO bricks</li>
                        <li>Detailed instruction manual</li>
                        <li>Collectible minifigures</li>
                        <li>Compatible with all LEGO sets</li>
                    </ul>
                </div>
                <button class="add-to-cart">Add to Collection</button>
            </div>
        `;

        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.close');
        const addToCartBtn = modal.querySelector('.add-to-cart');

        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        addToCartBtn.addEventListener('click', () => {
            showNotification(`${setName} added to your collection!`);
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    const animateElements = document.querySelectorAll('.set-card, .theme-item, .gallery-item, .stat');
    animateElements.forEach(el => observer.observe(el));

    const bricks = document.querySelectorAll('.brick');
    bricks.forEach((brick, index) => {
        brick.addEventListener('click', function() {
            this.style.animationDuration = '0.5s';
            this.style.transform = 'scale(1.2) rotate(360deg)';
            
            setTimeout(() => {
                this.style.animationDuration = '3s';
                this.style.transform = '';
            }, 500);
        });
    });

    let currentTheme = 'default';
    const themeItems = document.querySelectorAll('.theme-item');
    const themeSetsDisplay = document.getElementById('theme-sets-display');
    const themeTitle = document.getElementById('theme-title');
    const themeSetsGrid = document.getElementById('theme-sets-grid');
    const closeThemeBtn = document.getElementById('close-theme-sets');
    
    const themeSetsData = {
        'architecture': [
            { name: 'Big Ben', description: 'Iconic London landmark', image: 'images/bigben.jpg' },
            { name: 'Statue of Liberty', description: 'Symbol of freedom and democracy', image: 'images/statue-liberty.jpg' },
            { name: 'Empire State Building', description: 'New York\'s famous skyscraper', image: 'images/empire-state.jpg' },
            { name: 'Taj Mahal', description: 'Indian architectural masterpiece', image: 'images/taj-mahal.jpg' },
            { name: 'Sydney Opera House', description: 'Australia\'s iconic performing arts venue', image: 'images/opera-house.jpg' },
            { name: 'Tower Bridge', description: 'London\'s famous bascule bridge', image: 'images/tower-bridge.jpg' }
        ],
        'technic': [
            { name: 'Mercedes-AMG F1 W14', description: 'Formula 1 racing car with working steering', image: 'images/mercedes-f1.jpg' },
            { name: 'Porsche 911 GT3 RS', description: 'Detailed sports car replica', image: 'images/porsche-911.jpg' },
            { name: 'Liebherr Excavator', description: 'Heavy machinery with moving parts', image: 'images/liebherr.jpg' },
            { name: 'Bugatti Chiron', description: 'Supercar with W16 engine', image: 'images/bugatti.jpg' },
            { name: 'Rough Terrain Crane', description: 'Construction vehicle with boom', image: 'images/crane.jpg' },
            { name: 'Ducati Panigale V4', description: 'Motorcycle with gearbox', image: 'images/ducati.jpg' }
        ],
        'harry-potter': [
            { name: 'Hogwarts Castle', description: 'Massive castle with detailed interiors', image: 'images/hogwarts-castle.jpg' },
            { name: 'Diagon Alley', description: 'Magical shopping street', image: 'images/diagon-alley.jpg' },
            { name: 'Hogwarts Express', description: 'Train to Hogwarts with Platform 9¾', image: 'images/hogwarts-express.jpg' },
            { name: 'Great Hall', description: 'Where students dine and gather', image: 'images/great-hall.jpg' },
            { name: 'Whomping Willow', description: 'Aggressive tree from the grounds', image: 'images/whomping-willow.jpg' },
            { name: 'Knight Bus', description: 'Triple-decker purple bus', image: 'images/knight-bus.jpg' }
        ],
        'ninjago': [
            { name: 'Golden Dragon', description: 'Majestic dragon with poseable wings', image: 'images/golden-dragon.jpg' },
            { name: 'Destiny\'s Bounty', description: 'Flying ninja ship', image: 'images/destinys-bounty.jpg' },
            { name: 'Monastery of Spinjitzu', description: 'Training ground for ninjas', image: 'images/monastery.jpg' },
            { name: 'Fire Temple', description: 'Ancient temple with traps', image: 'images/fire-temple.jpg' },
            { name: 'Ultra Dragon', description: 'Four-headed elemental dragon', image: 'images/ultra-dragon.jpg' },
            { name: 'Ninja DB X', description: 'High-tech ninja vehicle', image: 'images/ninja-db-x.jpg' }
        ],
        'friends': [
            { name: 'Beach House', description: 'Seaside vacation home with pool', image: 'images/friends-beach-house.jpg' },
            { name: 'Heartlake City Park Café', description: 'Outdoor café with playground', image: 'images/friends-cafe.jpg' },
            { name: 'Horse Stable', description: 'Take care of horses with Emma and Mia', image: 'images/friends-horse-stable.jpg' },
            { name: 'Heartlake City Vet Clinic', description: 'Animal hospital for pets', image: 'images/friends-vet-clinic.jpg' },
            { name: 'Nature Glamping', description: 'Outdoor camping adventure', image: 'images/friends-glamping.jpg' },
            { name: 'Heartlake City School', description: 'Educational fun with friends', image: 'images/friends-heartlake.jpg' }
        ],
        'star-wars': [
            { name: 'Millennium Falcon', description: 'Iconic smuggler ship with detailed interior', image: 'images/millennium-falcon.jpg' },
            { name: 'Death Star', description: 'Ultimate weapon with multiple scenes', image: 'images/death-star.jpg' },
            { name: 'X-wing Starfighter', description: 'Rebel Alliance fighter with opening wings', image: 'images/x-wing.jpg' },
            { name: 'TIE Fighter', description: 'Imperial starfighter with pilot', image: 'images/tie-fighter.jpg' },
            { name: 'AT-AT Walker', description: 'Massive Imperial assault vehicle', image: 'images/at-at.jpg' },
            { name: 'The Mandalorian Razor Crest', description: 'Bounty hunter ship with Baby Yoda', image: 'images/mandalorian.jpg' }
        ],
        'biggest-legos': [
            { name: 'LEGO Concorde', description: 'Iconic supersonic passenger jet', image: 'images/concorde.jpg' },
            { name: 'Harley-Davidson Fat Boy', description: 'Classic American motorcycle', image: 'images/harley-davidson.jpg' }
        ]
    };

    // Comprehensive search database - ALL LEGO sets on the website
    const allLegoSets = [
        // Main Sets Section
        { name: 'Creator Expert Galaxy Explorer', description: 'Advanced building experiences for adult fans', image: 'images/creator-expert.jpg', theme: 'Creator Expert', section: 'Popular Sets' },
        { name: 'Star Wars Millennium Falcon', description: 'Build iconic ships and characters from a galaxy far, far away', image: 'images/star-wars.jpg', theme: 'Star Wars', section: 'Popular Sets' },
        { name: 'City Fire Station', description: 'Create your own bustling city with vehicles and buildings', image: 'images/city.jpg', theme: 'City', section: 'Popular Sets' },
        { name: 'Friends Beach House', description: 'Join Emma, Mia, and friends on their adventures', image: 'images/friends.jpg', theme: 'Friends', section: 'Popular Sets' },
        
        
        // Architecture Theme Sets
        { name: 'Big Ben', description: 'Iconic London landmark', image: 'images/bigben.jpg', theme: 'Architecture', section: 'Architecture Theme' },
        { name: 'Statue of Liberty', description: 'Symbol of freedom and democracy', image: 'images/statue-liberty.jpg', theme: 'Architecture', section: 'Architecture Theme' },
        { name: 'Empire State Building', description: 'New York\'s famous skyscraper', image: 'images/empire-state.jpg', theme: 'Architecture', section: 'Architecture Theme' },
        { name: 'Taj Mahal', description: 'Indian architectural masterpiece', image: 'images/taj-mahal.jpg', theme: 'Architecture', section: 'Architecture Theme' },
        { name: 'Sydney Opera House', description: 'Australia\'s iconic performing arts venue', image: 'images/opera-house.jpg', theme: 'Architecture', section: 'Architecture Theme' },
        { name: 'Tower Bridge', description: 'London\'s famous bascule bridge', image: 'images/tower-bridge.jpg', theme: 'Architecture', section: 'Architecture Theme' },
        
        // Technic Theme Sets
        { name: 'Mercedes-AMG F1 W14', description: 'Formula 1 racing car with working steering', image: 'images/mercedes-f1.jpg', theme: 'Technic', section: 'Technic Theme' },
        { name: 'Porsche 911 GT3 RS', description: 'Detailed sports car replica', image: 'images/porsche-911.jpg', theme: 'Technic', section: 'Technic Theme' },
        { name: 'Liebherr Excavator', description: 'Heavy machinery with moving parts', image: 'images/liebherr.jpg', theme: 'Technic', section: 'Technic Theme' },
        { name: 'Bugatti Chiron', description: 'Supercar with W16 engine', image: 'images/bugatti.jpg', theme: 'Technic', section: 'Technic Theme' },
        { name: 'Rough Terrain Crane', description: 'Construction vehicle with boom', image: 'images/crane.jpg', theme: 'Technic', section: 'Technic Theme' },
        { name: 'Ducati Panigale V4', description: 'Motorcycle with gearbox', image: 'images/ducati.jpg', theme: 'Technic', section: 'Technic Theme' },
        
        // Harry Potter Theme Sets
        { name: 'Hogwarts Castle', description: 'Massive castle with detailed interiors', image: 'images/hogwarts-castle.jpg', theme: 'Harry Potter', section: 'Harry Potter Theme' },
        { name: 'Diagon Alley', description: 'Magical shopping street', image: 'images/diagon-alley.jpg', theme: 'Harry Potter', section: 'Harry Potter Theme' },
        { name: 'Hogwarts Express', description: 'Train to Hogwarts with Platform 9¾', image: 'images/hogwarts-express.jpg', theme: 'Harry Potter', section: 'Harry Potter Theme' },
        { name: 'Great Hall', description: 'Where students dine and gather', image: 'images/great-hall.jpg', theme: 'Harry Potter', section: 'Harry Potter Theme' },
        { name: 'Whomping Willow', description: 'Aggressive tree from the grounds', image: 'images/whomping-willow.jpg', theme: 'Harry Potter', section: 'Harry Potter Theme' },
        { name: 'Knight Bus', description: 'Triple-decker purple bus', image: 'images/knight-bus.jpg', theme: 'Harry Potter', section: 'Harry Potter Theme' },
        
        // Ninjago Theme Sets
        { name: 'Golden Dragon', description: 'Majestic dragon with poseable wings', image: 'images/golden-dragon.jpg', theme: 'Ninjago', section: 'Ninjago Theme' },
        { name: 'Destiny\'s Bounty', description: 'Flying ninja ship', image: 'images/destinys-bounty.jpg', theme: 'Ninjago', section: 'Ninjago Theme' },
        { name: 'Monastery of Spinjitzu', description: 'Training ground for ninjas', image: 'images/monastery.jpg', theme: 'Ninjago', section: 'Ninjago Theme' },
        { name: 'Fire Temple', description: 'Ancient temple with traps', image: 'images/fire-temple.jpg', theme: 'Ninjago', section: 'Ninjago Theme' },
        { name: 'Ultra Dragon', description: 'Four-headed elemental dragon', image: 'images/ultra-dragon.jpg', theme: 'Ninjago', section: 'Ninjago Theme' },
        { name: 'Ninja DB X', description: 'High-tech ninja vehicle', image: 'images/ninja-db-x.jpg', theme: 'Ninjago', section: 'Ninjago Theme' },
        
        // Friends Theme Sets
        { name: 'Beach House', description: 'Seaside vacation home with pool', image: 'images/friends-beach-house.jpg', theme: 'Friends', section: 'Friends Theme' },
        { name: 'Heartlake City Park Café', description: 'Outdoor café with playground', image: 'images/friends-cafe.jpg', theme: 'Friends', section: 'Friends Theme' },
        { name: 'Horse Stable', description: 'Take care of horses with Emma and Mia', image: 'images/friends-horse-stable.jpg', theme: 'Friends', section: 'Friends Theme' },
        { name: 'Heartlake City Vet Clinic', description: 'Animal hospital for pets', image: 'images/friends-vet-clinic.jpg', theme: 'Friends', section: 'Friends Theme' },
        { name: 'Nature Glamping', description: 'Outdoor camping adventure', image: 'images/friends-glamping.jpg', theme: 'Friends', section: 'Friends Theme' },
        { name: 'Heartlake City School', description: 'Educational fun with friends', image: 'images/friends-heartlake.jpg', theme: 'Friends', section: 'Friends Theme' },
        
        // Star Wars Theme Sets
        { name: 'Millennium Falcon', description: 'Iconic smuggler ship with detailed interior', image: 'images/millennium-falcon.jpg', theme: 'Star Wars', section: 'Star Wars Theme' },
        { name: 'Death Star', description: 'Ultimate weapon with multiple scenes', image: 'images/death-star.jpg', theme: 'Star Wars', section: 'Star Wars Theme' },
        { name: 'X-wing Starfighter', description: 'Rebel Alliance fighter with opening wings', image: 'images/x-wing.jpg', theme: 'Star Wars', section: 'Star Wars Theme' },
        { name: 'TIE Fighter', description: 'Imperial starfighter with pilot', image: 'images/tie-fighter.jpg', theme: 'Star Wars', section: 'Star Wars Theme' },
        { name: 'AT-AT Walker', description: 'Massive Imperial assault vehicle', image: 'images/at-at.jpg', theme: 'Star Wars', section: 'Star Wars Theme' },
        { name: 'The Mandalorian Razor Crest', description: 'Bounty hunter ship with Baby Yoda', image: 'images/mandalorian.jpg', theme: 'Star Wars', section: 'Star Wars Theme' },
        
        
        // Additional LEGO Sets from Around the World
        // Classic Space Sets
        { name: 'Galaxy Explorer (497)', description: 'Classic space exploration vehicle from 1979', image: 'images/creator-expert.jpg', theme: 'Classic Space', section: 'Classic Sets' },
        { name: 'Space Cruiser (928)', description: 'Large space cruiser with landing craft', image: 'images/creator-expert.jpg', theme: 'Classic Space', section: 'Classic Sets' },
        { name: 'Mobile Rocket Base (6930)', description: 'Moon base with rocket launch pad', image: 'images/creator-expert.jpg', theme: 'Classic Space', section: 'Classic Sets' },
        
        // Creator Expert Series
        { name: 'Volkswagen Beetle (10252)', description: 'Classic blue Volkswagen Beetle', image: 'images/creator-expert.jpg', theme: 'Creator Expert', section: 'Creator Expert' },
        { name: 'MINI Cooper (10242)', description: 'Green and white MINI Cooper MK VII', image: 'images/creator-expert.jpg', theme: 'Creator Expert', section: 'Creator Expert' },
        { name: 'London Bus (10258)', description: 'Red double-decker London bus', image: 'images/creator-expert.jpg', theme: 'Creator Expert', section: 'Creator Expert' },
        { name: 'Winter Holiday Train (10254)', description: 'Festive Christmas train set', image: 'images/creator-expert.jpg', theme: 'Creator Expert', section: 'Creator Expert' },
        
        // Marvel Super Heroes
        { name: 'Spider-Man Daily Bugle (76178)', description: 'Massive Daily Bugle building with minifigures', image: 'images/daily-bugle.jpg', theme: 'Marvel', section: 'Marvel Sets' },
        { name: 'Avengers Tower (76269)', description: 'Stark Tower with all the Avengers', image: 'images/daily-bugle.jpg', theme: 'Marvel', section: 'Marvel Sets' },
        { name: 'X-Men X-Mansion (76294)', description: 'Professor X\'s school for gifted youngsters', image: 'images/daily-bugle.jpg', theme: 'Marvel', section: 'Marvel Sets' },
        
        // DC Super Heroes
        { name: 'Batman Batcave (76248)', description: 'The Dark Knight\'s secret hideout', image: 'images/daily-bugle.jpg', theme: 'DC Comics', section: 'DC Sets' },
        { name: 'Superman Fortress of Solitude (76244)', description: 'Superman\'s arctic fortress', image: 'images/daily-bugle.jpg', theme: 'DC Comics', section: 'DC Sets' },
        
        // Pirates
        { name: 'Pirates of Barracuda Bay (21322)', description: 'Shipwreck island with pirate treasure', image: 'images/gallery1.jpg', theme: 'Pirates', section: 'Pirates Sets' },
        { name: 'Black Seas Barracuda (6285)', description: 'Classic pirate ship from 1989', image: 'images/gallery1.jpg', theme: 'Pirates', section: 'Pirates Sets' },
        { name: 'Eldorado Fortress (6276)', description: 'Imperial garrison fort', image: 'images/gallery1.jpg', theme: 'Pirates', section: 'Pirates Sets' },
        
        // Castle
        { name: 'Lion Knights Castle (10305)', description: 'Medieval castle with knights', image: 'images/gallery1.jpg', theme: 'Castle', section: 'Castle Sets' },
        { name: 'Black Monarch\'s Castle (6086)', description: 'Dark castle with dragon knights', image: 'images/gallery1.jpg', theme: 'Castle', section: 'Castle Sets' },
        { name: 'Royal Knight\'s Castle (6090)', description: 'Royal castle with drawbridge', image: 'images/gallery1.jpg', theme: 'Castle', section: 'Castle Sets' },
        
        // Trains
        { name: 'Crocodile Locomotive (10277)', description: 'Swiss electric locomotive', image: 'images/gallery2.jpg', theme: 'Trains', section: 'Train Sets' },
        { name: 'Horizon Express (10233)', description: 'High-speed passenger train', image: 'images/gallery2.jpg', theme: 'Trains', section: 'Train Sets' },
        { name: 'Cargo Train (60198)', description: 'Remote-controlled cargo train', image: 'images/gallery2.jpg', theme: 'Trains', section: 'Train Sets' },
        
        // Jurassic World
        { name: 'T. rex Breakout (76956)', description: 'T-Rex escape scene with gates', image: 'images/gallery3.jpg', theme: 'Jurassic World', section: 'Jurassic Sets' },
        { name: 'Baryonyx Face-Off (75935)', description: 'Treasure hunt with Baryonyx dinosaur', image: 'images/gallery3.jpg', theme: 'Jurassic World', section: 'Jurassic Sets' },
        
        // Speed Champions
        { name: 'Ferrari F8 Tributo (76895)', description: 'Italian supercar replica', image: 'images/gallery3.jpg', theme: 'Speed Champions', section: 'Speed Champions' },
        { name: 'McLaren Senna (75892)', description: 'Track-focused hypercar', image: 'images/gallery3.jpg', theme: 'Speed Champions', section: 'Speed Champions' },
        { name: 'Lamborghini Huracán Super Trofeo EVO (76899)', description: 'Race car with pit lane', image: 'images/gallery3.jpg', theme: 'Speed Champions', section: 'Speed Champions' },
        
        // Ideas Sets
        { name: 'Piano (21323)', description: 'Grand piano with working keys', image: 'images/gallery4.jpg', theme: 'Ideas', section: 'Ideas Sets' },
        { name: 'Ship in a Bottle (21313)', description: 'Classic ship in a bottle', image: 'images/gallery4.jpg', theme: 'Ideas', section: 'Ideas Sets' },
        { name: 'Tree House (21318)', description: 'Three-story tree house', image: 'images/gallery4.jpg', theme: 'Ideas', section: 'Ideas Sets' },
        { name: 'NASA Apollo Saturn V (21309)', description: 'Moon rocket with lunar lander', image: 'images/gallery4.jpg', theme: 'Ideas', section: 'Ideas Sets' },
        
        // Minecraft
        { name: 'The Mountain Cave (21137)', description: 'Underground Minecraft adventure', image: 'images/gallery5.jpg', theme: 'Minecraft', section: 'Minecraft Sets' },
        { name: 'The Village (21128)', description: 'Minecraft village with villagers', image: 'images/gallery5.jpg', theme: 'Minecraft', section: 'Minecraft Sets' },
        { name: 'The End Battle (21151)', description: 'Fight the Ender Dragon', image: 'images/gallery5.jpg', theme: 'Minecraft', section: 'Minecraft Sets' },
        
        // Ghostbusters
        { name: 'Ghostbusters Firehouse (75827)', description: 'Iconic New York firehouse headquarters', image: 'images/gallery6.jpg', theme: 'Ghostbusters', section: 'Ghostbusters Sets' },
        { name: 'Ecto-1 (21108)', description: 'Classic Ghostbusters vehicle', image: 'images/gallery6.jpg', theme: 'Ghostbusters', section: 'Ghostbusters Sets' },
        
        // Back to the Future
        { name: 'DeLorean Time Machine (10300)', description: 'Time traveling DeLorean car', image: 'images/gallery6.jpg', theme: 'Back to the Future', section: 'Movie Sets' },
        
        // Stranger Things
        { name: 'The Upside Down (75810)', description: 'Hawkins house with Upside Down version', image: 'images/gallery6.jpg', theme: 'Stranger Things', section: 'TV Sets' },
        
        // Avatar: The Last Airbender
        { name: 'Northern Air Temple (21318)', description: 'Aang\'s spiritual home', image: 'images/gallery1.jpg', theme: 'Avatar', section: 'Avatar Sets' },
        
        // The Lord of the Rings
        { name: 'Rivendell (10316)', description: 'Elrond\'s peaceful valley', image: 'images/gallery1.jpg', theme: 'Lord of the Rings', section: 'LOTR Sets' },
        { name: 'Tower of Orthanc (10237)', description: 'Saruman\'s tower fortress', image: 'images/gallery1.jpg', theme: 'Lord of the Rings', section: 'LOTR Sets' },
        
        // Indiana Jones
        { name: 'Temple of the Golden Idol (77015)', description: 'Booby-trapped temple from Raiders', image: 'images/gallery2.jpg', theme: 'Indiana Jones', section: 'Indiana Jones Sets' },
        { name: 'Fighter Plane Chase (77012)', description: 'Biplane dogfight scene', image: 'images/gallery2.jpg', theme: 'Indiana Jones', section: 'Indiana Jones Sets' },
        
        // Monkie Kid
        { name: 'The Legendary Flower Fruit Mountain (80024)', description: 'Monkey King\'s mountain palace', image: 'images/gallery3.jpg', theme: 'Monkie Kid', section: 'Monkie Kid Sets' },
        { name: 'Monkie Kid\'s Team Secret HQ (80013)', description: 'Underground headquarters', image: 'images/gallery3.jpg', theme: 'Monkie Kid', section: 'Monkie Kid Sets' },
        
        // Hidden Side
        { name: 'Newbury Haunted High School (70425)', description: 'Spooky high school with AR features', image: 'images/gallery4.jpg', theme: 'Hidden Side', section: 'Hidden Side Sets' },
        { name: 'Mystery Castle (70437)', description: 'Haunted castle with ghosts', image: 'images/gallery4.jpg', theme: 'Hidden Side', section: 'Hidden Side Sets' },
        
        // Overwatch
        { name: 'D.Va & Reinhardt (75973)', description: 'Mech suit and armored knight', image: 'images/gallery5.jpg', theme: 'Overwatch', section: 'Overwatch Sets' },
        { name: 'Watchpoint: Gibraltar (75975)', description: 'Overwatch base headquarters', image: 'images/gallery5.jpg', theme: 'Overwatch', section: 'Overwatch Sets' },
        
        // The LEGO Movie
        { name: 'MetalBeard\'s Sea Cow (70810)', description: 'Pirate ship spaceship hybrid', image: 'images/gallery6.jpg', theme: 'LEGO Movie', section: 'LEGO Movie Sets' },
        { name: 'Cloud Cuckoo Palace (70803)', description: 'Unikitty\'s colorful palace', image: 'images/gallery6.jpg', theme: 'LEGO Movie', section: 'LEGO Movie Sets' },
        
        // MOTORCYCLE SETS - All LEGO Motorcycles
        { name: 'Harley-Davidson Fat Boy (10269)', description: 'Classic American motorcycle', image: 'images/harley-davidson.jpg', theme: 'Creator Expert', section: 'Motorcycle Sets' },
        { name: 'Ducati Panigale V4 R (42107)', description: 'Superbike with gearbox and suspension', image: 'images/ducati-panigale.jpg', theme: 'Technic', section: 'Motorcycle Sets' },
        { name: 'BMW M 1000 RR (42130)', description: 'Racing motorcycle with advanced features', image: 'images/bmw-m1000rr.jpg', theme: 'Technic', section: 'Motorcycle Sets' },
        { name: 'Yamaha MT-10 SP (42159)', description: 'Naked sport bike with detailed engine', image: 'images/yamaha-mt10.jpg', theme: 'Technic', section: 'Motorcycle Sets' },
        { name: 'Honda CRF1000L Africa Twin (42101)', description: 'Adventure touring motorcycle', image: 'images/honda-africa-twin.jpg', theme: 'Technic', section: 'Motorcycle Sets' },
        { name: 'BMW R 1200 GS Adventure (42063)', description: 'Adventure bike with luggage', image: 'images/bmw-r1200gs.jpg', theme: 'Technic', section: 'Motorcycle Sets' },
        { name: 'Street Motorcycle (31114)', description: 'Classic street bike 3-in-1', image: 'images/street-motorcycle.jpg', theme: 'Creator 3-in-1', section: 'Motorcycle Sets' },
        
        // AIRPLANE SETS - All LEGO Aircraft
        { name: 'LEGO Concorde (10318)', description: 'Iconic supersonic passenger jet', image: 'images/concorde.jpg', theme: 'Creator Expert', section: 'Aviation Sets' },
        { name: 'Boeing 787 Dreamliner (10177)', description: 'Large passenger aircraft', image: 'images/boeing-787.jpg', theme: 'Creator Expert', section: 'Aviation Sets' },
        { name: 'Sopwith Camel (10226)', description: 'World War I biplane fighter', image: 'images/sopwith-camel.jpg', theme: 'Creator Expert', section: 'Aviation Sets' },
        { name: 'Wright Flyer (10124)', description: 'First powered aircraft', image: 'images/wright-flyer.jpg', theme: 'Creator Expert', section: 'Aviation Sets' },
        { name: 'Airplane (31099)', description: 'Propeller plane 3-in-1', image: 'images/propeller-plane.jpg', theme: 'Creator 3-in-1', section: 'Aviation Sets' },
        { name: 'Cargo Plane (31109)', description: 'Heavy transport aircraft 3-in-1', image: 'images/cargo-plane.jpg', theme: 'Creator 3-in-1', section: 'Aviation Sets' },
        { name: 'Supersonic Jet (31126)', description: 'Fighter jet 3-in-1', image: 'images/supersonic-jet.jpg', theme: 'Creator 3-in-1', section: 'Aviation Sets' },
        { name: 'Air Race Plane (42117)', description: 'Stunt plane with working propeller', image: 'images/air-race-plane.jpg', theme: 'Technic', section: 'Aviation Sets' },
        { name: 'Rescue Helicopter (42092)', description: 'Emergency helicopter with winch', image: 'images/rescue-helicopter.jpg', theme: 'Technic', section: 'Aviation Sets' },
        { name: 'Fire Helicopter (60281)', description: 'Firefighting helicopter', image: 'images/fire-helicopter.jpg', theme: 'City', section: 'Aviation Sets' },
        { name: 'Police Helicopter (60275)', description: 'Law enforcement aircraft', image: 'images/police-helicopter.jpg', theme: 'City', section: 'Aviation Sets' },
        { name: 'Passenger Airplane (60262)', description: 'Commercial airliner', image: 'images/passenger-airplane.jpg', theme: 'City', section: 'Aviation Sets' },
        { name: 'Cargo Terminal (60169)', description: 'Airport with cargo plane', image: 'images/cargo-terminal.jpg', theme: 'City', section: 'Aviation Sets' },
        { name: 'Private Jet (60102)', description: 'Luxury business aircraft', image: 'images/private-jet.jpg', theme: 'City', section: 'Aviation Sets' },
        { name: 'Seaplane (31028)', description: 'Water landing aircraft', image: 'images/seaplane.jpg', theme: 'Creator 3-in-1', section: 'Aviation Sets' },
        
        // CAR SETS - All LEGO Cars
        { name: 'Bugatti Chiron (42083)', description: 'Luxury supercar with W16 engine', image: 'images/bugatti-chiron.jpg', theme: 'Technic', section: 'Car Sets' },
        { name: 'Porsche 911 GT3 RS (42056)', description: 'Sports car with PDK transmission', image: 'images/porsche-911-gt3.jpg', theme: 'Technic', section: 'Car Sets' },
        { name: 'McLaren Senna GTR (42123)', description: 'Track-focused supercar', image: 'images/mclaren-senna.jpg', theme: 'Technic', section: 'Car Sets' },
        { name: 'Lamborghini Sián FKP 37 (42115)', description: 'Hybrid supercar', image: 'images/lamborghini-sian.jpg', theme: 'Technic', section: 'Car Sets' },
        { name: 'Ferrari Daytona SP3 (42143)', description: 'Limited edition supercar', image: 'images/ferrari-daytona.jpg', theme: 'Technic', section: 'Car Sets' },
        { name: 'BMW M4 GT3 (42127)', description: 'Race car with detailed interior', image: 'images/bmw-m4-gt3.jpg', theme: 'Technic', section: 'Car Sets' },
        { name: 'Formula 1 Car (42000)', description: 'F1 racing car', image: 'images/formula-1-car.jpg', theme: 'Technic', section: 'Car Sets' },
        { name: 'Rally Car (42077)', description: 'Off-road racing vehicle', image: 'images/rally-car.jpg', theme: 'Technic', section: 'Car Sets' },
        { name: 'Police Car (60312)', description: 'Law enforcement vehicle', image: 'images/police-car.jpg', theme: 'City', section: 'Car Sets' },
        { name: 'Fire Chief Car (60231)', description: 'Emergency response vehicle', image: 'images/fire-chief-car.jpg', theme: 'City', section: 'Car Sets' },
        { name: 'Sports Car (31100)', description: 'Convertible sports car 3-in-1', image: 'images/sports-car-31100.jpg', theme: 'Creator 3-in-1', section: 'Car Sets' },
        { name: 'Race Car (31127)', description: 'Formula racing car 3-in-1', image: 'images/race-car-31127.jpg', theme: 'Creator 3-in-1', section: 'Car Sets' },
        { name: 'Cyber Truck (31142)', description: 'Futuristic electric vehicle 3-in-1', image: 'images/cyber-truck.jpg', theme: 'Creator 3-in-1', section: 'Car Sets' },
        { name: 'Vintage Car (10242)', description: 'Classic Mini Cooper', image: 'images/mini-cooper.jpg', theme: 'Creator Expert', section: 'Car Sets' },
        { name: 'Volkswagen Beetle (10252)', description: 'Classic VW Bug', image: 'images/vw-beetle.jpg', theme: 'Creator Expert', section: 'Car Sets' },
        { name: 'Ford Mustang (10265)', description: 'American muscle car', image: 'images/ford-mustang.jpg', theme: 'Creator Expert', section: 'Car Sets' },
        { name: 'Aston Martin DB5 (10262)', description: 'James Bond car with gadgets', image: 'images/aston-martin-db5.jpg', theme: 'Creator Expert', section: 'Car Sets' },
        
        // TRUCK SETS - All LEGO Trucks
        { name: 'Liebherr Excavator R 9800 (42100)', description: 'Mining truck with massive wheels', image: 'images/liebherr-excavator.jpg', theme: 'Technic', section: 'Truck Sets' },
        { name: 'Mack Anthem (42078)', description: 'Semi-truck with trailer', image: 'images/mack-anthem.jpg', theme: 'Technic', section: 'Truck Sets' },
        { name: 'Mercedes-Benz Arocs (42043)', description: 'Construction truck', image: 'images/mercedes-arocs.jpg', theme: 'Technic', section: 'Truck Sets' },
        { name: 'CLAAS XERION 5000 TRAC VC (42054)', description: 'Agricultural tractor', image: 'images/claas-xerion.jpg', theme: 'Technic', section: 'Truck Sets' },
        { name: 'Volvo Concept Wheel Loader ZEUX (42081)', description: 'Future construction vehicle', image: 'images/volvo-zeux.jpg', theme: 'Technic', section: 'Truck Sets' },
        { name: 'Concrete Mixer Truck (42112)', description: 'Construction mixing truck', image: 'images/concrete-mixer.jpg', theme: 'Technic', section: 'Truck Sets' },
        { name: 'Rough Terrain Crane (42082)', description: 'Mobile crane truck', image: 'images/rough-terrain-crane.jpg', theme: 'Technic', section: 'Truck Sets' },
        { name: 'Fire Truck (60279)', description: 'Ladder truck with platform', image: 'images/fire-truck-60279.jpg', theme: 'City', section: 'Truck Sets' },
        { name: 'Garbage Truck (60220)', description: 'Waste collection vehicle', image: 'images/garbage-truck.jpg', theme: 'City', section: 'Truck Sets' },
        { name: 'Delivery Truck (60117)', description: 'Package delivery vehicle', image: 'images/delivery-truck.jpg', theme: 'City', section: 'Truck Sets' },
        { name: 'Monster Truck (31101)', description: 'Off-road truck 3-in-1', image: 'images/monster-truck.jpg', theme: 'Creator 3-in-1', section: 'Truck Sets' },
        { name: 'Construction Bulldozer (31121)', description: 'Earth moving vehicle 3-in-1', image: 'images/construction-bulldozer.jpg', theme: 'Creator 3-in-1', section: 'Truck Sets' },
        { name: 'Pickup Truck (31103)', description: 'Utility truck 3-in-1', image: 'images/pickup-truck.jpg', theme: 'Creator 3-in-1', section: 'Truck Sets' },
        
        // TRAIN SETS - All LEGO Trains
        { name: 'Hogwarts Express (76405)', description: 'Magical train to Hogwarts', image: 'images/hogwarts-express-76405.jpg', theme: 'Harry Potter', section: 'Train Sets' },
        { name: 'Crocodile Locomotive (10277)', description: 'Historic electric locomotive', image: 'images/crocodile-locomotive.jpg', theme: 'Creator Expert', section: 'Train Sets' },
        { name: 'Emerald Night (10194)', description: 'Steam locomotive with tender', image: 'images/emerald-night.jpg', theme: 'Creator Expert', section: 'Train Sets' },
        { name: 'Passenger Train (60197)', description: 'Modern electric train', image: 'images/passenger-train-60197.jpg', theme: 'City', section: 'Train Sets' },
        { name: 'Cargo Train (60198)', description: 'Freight locomotive with cars', image: 'images/cargo-train-60198.jpg', theme: 'City', section: 'Train Sets' },
        { name: 'High-speed Passenger Train (60051)', description: 'Bullet train', image: 'images/high-speed-train.jpg', theme: 'City', section: 'Train Sets' },
        { name: 'Steam Train (31130)', description: 'Classic locomotive 3-in-1', image: 'images/steam-train-31130.jpg', theme: 'Creator 3-in-1', section: 'Train Sets' },
        { name: 'Train Station (60335)', description: 'Railway platform and building', image: 'images/train-station.jpg', theme: 'City', section: 'Train Sets' },
        { name: 'Freight Train (7939)', description: 'Cargo locomotive with remote control', image: 'images/freight-train-7939.jpg', theme: 'City', section: 'Train Sets' },
        { name: 'Maersk Train (10219)', description: 'Container freight train', image: 'images/maersk-train.jpg', theme: 'Creator Expert', section: 'Train Sets' },
        { name: 'Santa Fe Super Chief (10020)', description: 'American passenger train', image: 'images/santa-fe-train.jpg', theme: 'Creator Expert', section: 'Train Sets' },
        { name: 'Union Pacific Big Boy (10023)', description: 'Massive steam locomotive', image: 'images/big-boy-train.jpg', theme: 'Creator Expert', section: 'Train Sets' }
    ];
    
    themeItems.forEach(item => {
        item.addEventListener('click', function() {
            const themeKey = this.dataset.theme;
            const themeName = this.querySelector('h3').textContent;
            showThemeSets(themeKey, themeName);
        });
    });
    
    function showThemeSets(themeKey, themeName) {
        console.log('Showing theme sets for:', themeKey, themeName);
        
        if (!themeTitle || !themeSetsGrid || !themeSetsDisplay) {
            console.error('Required elements not found');
            return;
        }
        
        themeTitle.textContent = `${themeName} Sets`;
        themeSetsGrid.innerHTML = '';
        
        const sets = themeSetsData[themeKey] || [];
        console.log('Sets found:', sets.length);
        
        if (sets.length === 0) {
            themeSetsGrid.innerHTML = '<p style="color: white;">No sets found for this theme.</p>';
        } else {
            sets.forEach((set, index) => {
                console.log(`Creating card ${index + 1}:`, set.name);
                const setCard = document.createElement('div');
                setCard.className = 'theme-set-card';
                setCard.innerHTML = `
                    <div class="theme-set-image" style="background-image: url('${set.image}'); background-size: cover; background-position: center;"></div>
                    <h4>${set.name}</h4>
                    <p>${set.description}</p>
                `;
                themeSetsGrid.appendChild(setCard);
            });
        }
        
        themeSetsDisplay.style.display = 'block';
        setTimeout(() => {
            themeSetsDisplay.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
    
    closeThemeBtn.addEventListener('click', function() {
        themeSetsDisplay.style.display = 'none';
    });

    // Search functionality - searches through ALL LEGO sets
    function performSearch(query) {
        if (!query.trim()) return;
        
        const results = [];
        const searchTerm = query.toLowerCase();
        
        // Search through ALL LEGO sets on the website
        allLegoSets.forEach(set => {
            if (set.name.toLowerCase().includes(searchTerm) || 
                set.description.toLowerCase().includes(searchTerm) ||
                set.theme.toLowerCase().includes(searchTerm) ||
                set.section.toLowerCase().includes(searchTerm)) {
                results.push(set);
            }
        });
        
        displaySearchResults(results, query);
    }
    
    function displaySearchResults(results, query) {
        searchResultsTitle.textContent = `Search Results for "${query}"`;
        searchResultsGrid.innerHTML = '';
        
        if (results.length === 0) {
            searchResultsGrid.innerHTML = '<p style="color: white; text-align: center; grid-column: 1 / -1;">No LEGO sets found matching your search.</p>';
        } else {
            results.forEach((result, index) => {
                console.log(`Creating search result ${index + 1}:`, result.name, result.image);
                const resultCard = document.createElement('div');
                resultCard.className = 'search-result-card';
                
                // Create image element
                const imageDiv = document.createElement('div');
                imageDiv.className = 'search-result-image';
                imageDiv.style.backgroundImage = `url('${result.image}')`;
                imageDiv.style.backgroundSize = 'cover';
                imageDiv.style.backgroundPosition = 'center';
                imageDiv.style.backgroundRepeat = 'no-repeat';
                
                // Create name element
                const nameElement = document.createElement('h4');
                nameElement.textContent = result.name;
                nameElement.style.display = 'block';
                nameElement.style.visibility = 'visible';
                
                // Create description element
                const descElement = document.createElement('p');
                descElement.textContent = result.description;
                
                // Create theme badge
                const themeElement = document.createElement('div');
                themeElement.className = 'search-result-theme';
                themeElement.textContent = result.theme;
                
                // Create section label
                const sectionElement = document.createElement('div');
                sectionElement.style.fontSize = '0.7rem';
                sectionElement.style.color = '#666';
                sectionElement.style.marginTop = '0.5rem';
                sectionElement.textContent = result.section;
                
                // Append all elements
                resultCard.appendChild(imageDiv);
                resultCard.appendChild(nameElement);
                resultCard.appendChild(descElement);
                resultCard.appendChild(themeElement);
                resultCard.appendChild(sectionElement);
                
                searchResultsGrid.appendChild(resultCard);
            });
        }
        
        // Hide theme sets display if open
        themeSetsDisplay.style.display = 'none';
        
        // Show search results
        searchResultsDisplay.style.display = 'block';
        setTimeout(() => {
            searchResultsDisplay.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
    
    // Search event listeners
    searchBtn.addEventListener('click', function() {
        performSearch(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
        }
    });
    
    closeSearchBtn.addEventListener('click', function() {
        searchResultsDisplay.style.display = 'none';
        searchInput.value = '';
    });

    function changeTheme(theme) {
        const root = document.documentElement;
        
        switch(theme) {
            case 'architecture':
                root.style.setProperty('--primary-gradient', 'linear-gradient(135deg, #8B4513, #D2691E)');
                break;
            case 'technic':
                root.style.setProperty('--primary-gradient', 'linear-gradient(135deg, #2C3E50, #34495E)');
                break;
            case 'harry potter':
                root.style.setProperty('--primary-gradient', 'linear-gradient(135deg, #722F37, #DAA520)');
                break;
            case 'ninjago':
                root.style.setProperty('--primary-gradient', 'linear-gradient(135deg, #000000, #FF0000)');
                break;
            default:
                root.style.setProperty('--primary-gradient', 'linear-gradient(135deg, #667eea, #764ba2)');
        }
        
        showNotification(`Switched to ${theme.charAt(0).toUpperCase() + theme.slice(1)} theme!`);
    }
});

const modalStyles = `
<style>
.modal {
    display: block;
    position: fixed;
    z-index: 2000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
    backdrop-filter: blur(5px);
}

.modal-content {
    background: linear-gradient(135deg, #fff, #f8f9fa);
    margin: 5% auto;
    padding: 2rem;
    border-radius: 20px;
    width: 90%;
    max-width: 600px;
    position: relative;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    color: #333;
}

.close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    font-size: 2rem;
    cursor: pointer;
    color: #666;
    transition: color 0.3s ease;
}

.close:hover {
    color: #e74c3c;
}

.modal-image {
    width: 100%;
    height: 200px;
    background: linear-gradient(45deg, #f39c12, #e74c3c);
    border-radius: 10px;
    margin: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
}

.modal-image::before {
    content: '';
}

.set-features {
    margin: 1.5rem 0;
}

.set-features h3 {
    color: #e74c3c;
    margin-bottom: 0.5rem;
}

.set-features ul {
    list-style-type: none;
    padding-left: 0;
}

.set-features li {
    padding: 0.3rem 0;
    position: relative;
    padding-left: 1.5rem;
}

.set-features li::before {
    content: '🔧';
    position: absolute;
    left: 0;
}

.add-to-cart {
    background: linear-gradient(45deg, #27ae60, #2ecc71);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    cursor: pointer;
    font-size: 1rem;
    transition: transform 0.3s ease;
    width: 100%;
    margin-top: 1rem;
}

.add-to-cart:hover {
    transform: translateY(-2px);
}

.notification {
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(45deg, #2ecc71, #27ae60);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 3000;
}

.notification.show {
    transform: translateX(0);
    opacity: 1;
}

.animate-in {
    animation: slideInUp 0.6s ease-out;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', modalStyles);