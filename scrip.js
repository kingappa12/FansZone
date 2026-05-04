// Base de données des produits
const produits = [
    {
        id: 1,
        nom: "Real Madrid",
        equipe: "Real Madrid",
        type: "player",
        prix: 7000,
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9e18?w=400&h=500&fit=crop"
    },
    {
        id: 2,
        nom: "Real Madrid",
        equipe: "Real Madrid",
        type: "fans",
        prix: 6000,
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9e18?w=400&h=500&fit=crop"
    },
    {
        id: 3,
        nom: "Barcelona",
        equipe: "Barcelona",
        type: "player",
        prix: 7000,
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=500&fit=crop"
    },
    {
        id: 4,
        nom: "Barcelona",
        equipe: "Barcelona",
        type: "fans",
        prix: 6000,
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=500&fit=crop"
    },
    {
        id: 5,
        nom: "Manchester United",
        equipe: "Manchester United",
        type: "player",
        prix: 7000,
        image: "https://images.unsplash.com/photo-1596176505529-a41d09d67e1c?w=400&h=500&fit=crop"
    },
    {
        id: 6,
        nom: "Manchester United",
        equipe: "Manchester United",
        type: "fans",
        prix: 6000,
        image: "https://images.unsplash.com/photo-1596176505529-a41d09d67e1c?w=400&h=500&fit=crop"
    },
    {
        id: 7,
        nom: "Liverpool",
        equipe: "Liverpool",
        type: "player",
        prix: 7000,
        image: "https://images.unsplash.com/photo-1577280643272-265bfb4f7f21?w=400&h=500&fit=crop"
    },
    {
        id: 8,
        nom: "Liverpool",
        equipe: "Liverpool",
        type: "fans",
        prix: 6000,
        image: "https://images.unsplash.com/photo-1577280643272-265bfb4f7f21?w=400&h=500&fit=crop"
    },
    {
        id: 9,
        nom: "Chelsea",
        equipe: "Chelsea",
        type: "player",
        prix: 7000,
        image: "https://images.unsplash.com/photo-1551473789-bcc5c2bedfb0?w=400&h=500&fit=crop"
    },
    {
        id: 10,
        nom: "Chelsea",
        equipe: "Chelsea",
        type: "fans",
        prix: 6000,
        image: "https://images.unsplash.com/photo-1551473789-bcc5c2bedfb0?w=400&h=500&fit=crop"
    }
];

let panier = [];
let produitActuel = null;

// Charger les produits
function chargerProduits() {
    const grille = document.getElementById('produits-grid');
    grille.innerHTML = '';
    
    produits.forEach(produit => {
        const card = document.createElement('div');
        card.className = 'produit-card';
        card.innerHTML = `
            <img src="${produit.image}" alt="${produit.nom}">
            <div class="produit-info">
                <h3>${produit.nom}</h3>
                <span class="type">${produit.type === 'player' ? 'Version Player' : 'Version Fans'}</span>
                <p class="prix">${produit.prix.toLocaleString()} FCFA</p>
                <button class="btn-primary" onclick="ouvrirModal(${produit.id})">Voir détails</button>
            </div>
        `;
        grille.appendChild(card);
    });
}

// Filtrer les produits
document.getElementById('filtreType').addEventListener('change', function() {
    const type = this.value;
    const grille = document.getElementById('produits-grid');
    grille.innerHTML = '';
    
    const filtres = type ? produits.filter(p => p.type === type) : produits;
    
    filtres.forEach(produit => {
        const card = document.createElement('div');
        card.className = 'produit-card';
        card.innerHTML = `
            <img src="${produit.image}" alt="${produit.nom}">
            <div class="produit-info">
                <h3>${produit.nom}</h3>
                <span class="type">${produit.type === 'player' ? 'Version Player' : 'Version Fans'}</span>
                <p class="prix">${produit.prix.toLocaleString()} FCFA</p>
                <button class="btn-primary" onclick="ouvrirModal(${produit.id})">Voir détails</button>
            </div>
        `;
        grille.appendChild(card);
    });
});

// Ouvrir modal
function ouvrirModal(id) {
    produitActuel = produits.find(p => p.id === id);
    document.getElementById('modal-img').src = produitActuel.image;
    document.getElementById('modal-nom').textContent = produitActuel.nom;
    document.getElementById('modal-description').textContent = `Maillot ${produitActuel.equipe} - ${produitActuel.type === 'player' ? 'Version Player' : 'Version Fans'}`;
    document.getElementById('modal-prix').textContent = produitActuel.prix.toLocaleString() + ' FCFA';
    document.getElementById('quantite').value = 1;
    document.getElementById('modal-produit').style.display = 'block';
}

// Fermer modal
function fermerModal() {
    document.getElementById('modal-produit').style.display = 'none';
}

// Ajouter au panier
function ajouterAuPanier() {
    const quantite = parseInt(document.getElementById('quantite').value);
    
    for (let i = 0; i < quantite; i++) {
        panier.push({
            ...produitActuel,
            panierItemId: Date.now() + i
        });
    }
    
    fermerModal();
    afficherPanier();
    alert('✅ Produit ajouté au panier!');
}

// Afficher le panier
function afficherPanier() {
    const container = document.getElementById('panier-items');
    const countSpan = document.getElementById('panier-count');
    
    countSpan.textContent = panier.length;
    
    if (panier.length === 0) {
        container.innerHTML = '<p class="vide">Votre panier est vide</p>';
        document.getElementById('btn-paiement').style.display = 'none';
        document.getElementById('total').textContent = '0';
        return;
    }
    
    container.innerHTML = '';
    let total = 0;
    
    panier.forEach((item, index) => {
        total += item.prix;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'panier-item';
        itemDiv.innerHTML = `
            <div class="item-details">
                <h4>${item.nom}</h4>
                <p>${item.type === 'player' ? 'Version Player' : 'Version Fans'}</p>
                <p>${item.prix.toLocaleString()} FCFA</p>
            </div>
            <button class="btn-primary" onclick="supprimerDuPanier(${index})">❌ Supprimer</button>
        `;
        container.appendChild(itemDiv);
    });
    
    document.getElementById('total').textContent = total.toLocaleString();
    document.getElementById('btn-paiement').style.display = 'block';
}

// Supprimer du panier
function supprimerDuPanier(index) {
    panier.splice(index, 1);
    afficherPanier();
}

// Procéder au paiement
function procederPaiement() {
    const total = panier.reduce((sum, item) => sum + item.prix, 0);
    const commande = panier.map(item => `${item.nom} (${item.type === 'player' ? 'Player' : 'Fans'})`).join(', ');
    
    const message = `
Bonjour! 🎉

Commande FansZone 2.0:
${commande}

Total: ${total.toLocaleString()} FCFA

Pour payer, veuillez effectuer un virement via:
🟠 Orange Money: +223 74878819
🌊 Wave: +223 74878819

Merci!
    `;
    
    // Option 1: Envoyer par email
    window.location.href = `mailto:Kingappa04@gmail.com?subject=Nouvelle%20Commande%20FansZone&body=${encodeURIComponent(message)}`;
    
    // Option 2: WhatsApp (décommente si tu préfères)
    // window.open(`https://wa.me/22374878819?text=${encodeURIComponent(message)}`);
    
    alert('📧 Un email de confirmation a été envoyé!');
    panier = [];
    afficherPanier();
}

// Fermer modal si clic dehors
window.onclick = function(event) {
    const modal = document.getElementById('modal-produit');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Charger les produits au démarrage
chargerProduits();
afficherPanier();
