// API Base URL
const API_BASE = window.location.origin;

// Sayfa yüklendiğinde fırsatları getir
document.addEventListener('DOMContentLoaded', () => {
    loadDeals();
    
    // Her 30 saniyede bir güncelle
    setInterval(loadDeals, 30000);
});

async function loadDeals() {
    const tbody = document.getElementById('deals-tbody');
    
    try {
        // Aktif fırsatları getir (İndirim Bitti olmayanlar)
        const response = await fetch(`${API_BASE}/api/deals/active?limit=50`);
        
        if (!response.ok) {
            throw new Error('API hatası');
        }
        
        const deals = await response.json();
        
        if (deals.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px; color: #999;">
                        Henüz fırsat bulunmamaktadır.
                    </td>
                </tr>
            `;
            return;
        }
        
        tbody.innerHTML = deals.map(deal => createDealRow(deal)).join('');
        
    } catch (error) {
        console.error('Fırsatlar yüklenirken hata:', error);
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: #f44336;">
                    Fırsatlar yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.
                </td>
            </tr>
        `;
    }
}

function createDealRow(deal) {
    const isExpired = deal.title.toLowerCase().includes('indirim bitti') || 
                      deal.title.toLowerCase().includes('x indirim');
    
    const badge = isExpired 
        ? '<span class="topic-badge badge-expired">İndirim Bitti!</span>'
        : '<span class="topic-badge badge-discount">İndirim</span>';
    
    // Tarih formatla
    const date = formatDate(deal.created_at);
    
    // Hit sayısını formatla (örnek: 1.2K, 45K)
    const views = formatViews(Math.floor(Math.random() * 50000) + 100); // Örnek için random
    
    // Cevap sayısı (örnek)
    const replies = Math.floor(Math.random() * 50);
    
    // Forum ikonu (kaynağa göre)
    const icon = deal.source === 'DonanımArsivi' ? 'D' : 'R';
    
    return `
        <tr>
            <td class="col-topic">
                <div class="topic-title">
                    <span class="topic-number">${deal.id}</span>
                    <span class="topic-icon">${icon}</span>
                    ${badge}
                    <span class="topic-link">
                        ${escapeHtml(deal.title)}
                    </span>
                </div>
            </td>
            <td class="col-forum">Sıcak Fırsatlar</td>
            <td class="col-replies">${replies}</td>
            <td class="col-views">${views}</td>
            <td class="col-date">${date}</td>
            <td class="col-author">${deal.source}</td>
        </tr>
    `;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) {
        return 'Az önce';
    } else if (diffMins < 60) {
        return `${diffMins} dakika önce`;
    } else if (diffHours < 24) {
        return `${diffHours} saat önce`;
    } else if (diffDays === 1) {
        return 'Dün, ' + date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
        return `${diffDays} gün önce`;
    } else {
        return date.toLocaleDateString('tr-TR', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    }
}

function formatViews(views) {
    if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

