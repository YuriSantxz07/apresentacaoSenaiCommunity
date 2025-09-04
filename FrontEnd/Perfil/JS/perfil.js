// /FrontEnd/Perfil/JS/perfil.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- NOSSO BANCO DE DADOS DE USUÁRIOS ---
    const userDatabase = {
        'vinicius': {
            name: "Vinicius Gallo",
            title: "Desenvolvedor Full-Stack | Aluno de Análise e Desenvolvimento de Sistemas",
            location: "São Carlos, Brasil",
            avatar: "./img/viniciusGallo.jpg",
            cover: "https://images.unsplash.com/photo-1579403124614-197f69d8187b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            stats: { connections: 153, projects: 12 },
            about: "Entusiasta de tecnologia e estudante de Análise e Desenvolvimento de Sistemas no SENAI, com foco em criar soluções web robustas e escaláveis. Tenho experiência com JavaScript, React, Node.js e metodologias ágeis.",
            skills: ["React", "Node.js", "JavaScript", "TypeScript", "HTML5 & CSS3", "SQL", "Git & GitHub", "Scrum"],
            projects: [
                { title: "Projeto IoT com Arduino", image: "./img/unnamed.png", description: "Monitoramento de ambiente industrial em tempo real." },
                { title: "Torno CNC Modular", image: "./img/cnc.png", description: "Usinagem de alta precisão com design customizável." }
            ],
            connections: [
                { id: "miguel", name: "Miguel Piscki", title: "Desenvolvedor Backend", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
                { id: "ana", name: "Ana Silva", title: "Engenheira de Software", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
            ]
        },
        'miguel': {
            name: "Miguel Piscki",
            title: "Especialista em IoT e Automação",
            location: "Araraquara, Brasil",
            avatar: "https://randomuser.me/api/portraits/men/22.jpg",
            cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            stats: { connections: 87, projects: 5 },
            about: "Apaixonado por hardware e software. Conectando o mundo físico ao digital através de soluções inovadoras com Arduino e outras plataformas.",
            skills: ["Arduino", "C++", "Python", "Node.js", "Sensores IoT", "Automação Industrial"],
            projects: [
                { title: "Automação Industrial com Arduino", image: "./img/unnamed.png", description: "Sistema de monitoramento de temperatura e umidade." }
            ],
            connections: [
                 { id: "vinicius", name: "Vinicius Gallo", title: "Desenvolvedor Full-Stack", avatar: "./img/viniciusGallo.jpg" },
                 { id: "ana", name: "Ana Silva", title: "Engenheira de Software", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
            ]
        },
        'ana': {
            name: "Ana Silva",
            title: "Engenheira de Software na Tech Solutions Inc.",
            location: "São Paulo, Brasil",
            avatar: "https://randomuser.me/api/portraits/women/33.jpg",
            cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            stats: { connections: 432, projects: 18 },
            about: "Engenheira de software com 5 anos de experiência, especializada em desenvolvimento de sistemas distribuídos e microserviços na nuvem.",
            skills: ["Java", "Spring Boot", "AWS", "Docker", "Kubernetes", "Microserviços"],
            projects: [
                 { title: "Dashboard de Vendas", image: "./img/tiProjeto.png", description: "Análise de dados de vendas em tempo real." }
            ],
            connections: [
                 { id: "miguel", name: "Miguel Piscki", title: "Especialista em IoT", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
            ]
        },
        'senai': {
            name: "Senai São Carlos",
            title: "Faculdade de Tecnologia e Escola SENAI Antonio Adolpho Lobbe",
            location: "São Carlos, Brasil",
            avatar: "./img/senai.jpg",
            cover: "https://jornalpp.com.br/wp-content/uploads/2023/08/senai-sao-carlos-aerea-divulgacao-scaled.jpg",
            stats: { connections: 1250, projects: 200 },
            about: "O SENAI São Carlos é um centro de excelência em educação profissional e tecnológica, formando talentos para a indústria 4.0. Oferecemos cursos técnicos, de graduação e pós-graduação.",
            skills: ["Tecnologia", "Inovação", "Indústria 4.0", "Educação", "Mecatrônica", "Desenvolvimento de Sistemas"],
            projects: [],
            connections: []
        }
    };

    // --- LÓGICA PARA CARREGAR O PERFIL ---
    function loadProfile() {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('id') || 'vinicius';
        
        const user = userDatabase[userId];
        if (!user) {
            console.error("Usuário não encontrado!");
            return;
        }

        document.querySelector('.profile-cover img').src = user.cover;
        document.getElementById('profile-avatar-img').src = user.avatar;
        document.getElementById('profile-name').textContent = user.name;
        document.getElementById('profile-title').textContent = user.title;
        document.getElementById('profile-location-text').textContent = user.location;
        document.querySelector('.profile-stats .stat:nth-child(1) strong').textContent = user.stats.connections;
        document.querySelector('.profile-stats .stat:nth-child(2) strong').textContent = user.stats.projects;
        document.querySelector('#sobre p').textContent = user.about;
        document.querySelector('#sobre .tags-container').innerHTML = user.skills.map(skill => `<span class="tag">${skill}</span>`).join('');
        document.querySelector('#projetos .projetos-grid-perfil').innerHTML = user.projects.map(proj => `
            <div class="projeto-card-perfil">
               <div class="projeto-imagem" style="background-image: url('${proj.image}')"></div>
               <div class="projeto-conteudo"><h3>${proj.title}</h3><p>${proj.description}</p></div>
            </div>`).join('') || '<p>Nenhum projeto para exibir.</p>';
        document.querySelector('#conexoes h3').textContent = `Conexões (${user.stats.connections})`;
        document.querySelector('#conexoes .conexoes-grid').innerHTML = user.connections.map(conn => `
            <a href="perfil.html?id=${conn.id}" class="conexao-card-link">
                <div class="conexao-card">
                    <img src="${conn.avatar}" alt="${conn.name}">
                    <h4>${conn.name}</h4><p>${conn.title}</p>
                </div>
            </a>`).join('') || '<p>Nenhuma conexão para exibir.</p>';

        const actionsContainer = document.getElementById('profile-actions-container');
        if (userId === 'vinicius') {
             actionsContainer.innerHTML = `<button class="btn-perfil primary"><i class="fas fa-edit"></i> Editar Perfil</button>`;
        } else {
             actionsContainer.innerHTML = `<button class="btn-perfil primary"><i class="fas fa-user-plus"></i> Conectar</button><button class="btn-perfil secondary"><i class="fas fa-comment-dots"></i> Mensagem</button>`;
        }
    }

    // --- LÓGICA DAS ABAS ---
    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            tabs.forEach(item => item.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    loadProfile();
});