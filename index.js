document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '☰';
    document.querySelector('nav').appendChild(menuToggle);

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    const loadFoodListings = async () => {
        try {
            const response = await fetch('db.json');
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            const foodGrid = document.getElementById('foodGrid');
            
            foodGrid.innerHTML = data.foodListings.map(item => `
                <div class="food-card">
                    <img src="${item.image || 'placeholder-food.jpg'}" alt="${item.title}">
                    <div class="food-info">
                        <h3>${item.title}</h3>
                        <p>${item.business}</p>
                        <span class="price">$${item.price.toFixed(2)}</span>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading food listings:', error);
            document.getElementById('foodGrid').innerHTML = `
                <div class="error-message">
                    <p>Failed to load food listings. Please try again later.</p>
                </div>
            `;
        }
    };

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });

            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    });

    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    loadFoodListings();
});document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '☰';
    document.querySelector('nav').appendChild(menuToggle);

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    const foodCategories = {
        fruits: ['Apples', 'Bananas', 'Oranges'],
        vegetables: ['Carrots', 'Broccoli', 'Spinach'],
        bakery: ['Bread', 'Croissants', 'Muffins'],
        dairy: ['Milk', 'Cheese', 'Yogurt']
    };

    const fetchFoodData = async (category = 'all') => {
        try {
            const response = await fetch('db.json');
            if (!response.ok) throw new Error('Network error');
            
            const data = await response.json();
            let filteredItems = data.foodListings;
            
            if (category !== 'all') {
                filteredItems = data.foodListings.filter(item => 
                    foodCategories[category].some(food => 
                        item.title.toLowerCase().includes(food.toLowerCase())
                    )
                );
            }

            displayFoodItems(filteredItems);
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('foodGrid').innerHTML = `
                <div class="error">Failed to load items. Try again later.</div>
            `;
        }
    };

    const displayFoodItems = (items) => {
        const foodGrid = document.getElementById('foodGrid');
        
        if (items.length === 0) {
            foodGrid.innerHTML = '<div class="no-items">No items found</div>';
            return;
        }

        foodGrid.innerHTML = items.map(item => `
            <div class="food-card">
                <img src="${item.image || 'placeholder.jpg'}" alt="${item.title}">
                <div class="food-info">
                    <h3>${item.title}</h3>
                    <p>${item.business}</p>
                    <span class="price">$${item.price.toFixed(2)}</span>
                    <span class="category">${item.category || 'General'}</span>
                </div>
            </div>
        `).join('');
    };

    document.querySelector('.hero .btn-primary').addEventListener('click', () => {
        fetchFoodData();
        window.scrollTo({
            top: document.getElementById('shop').offsetTop - 80,
            behavior: 'smooth'
        });
    });

    document.querySelectorAll('.category-filter').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            fetchFoodData(category);
        });
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    });

    fetchFoodData();
});
