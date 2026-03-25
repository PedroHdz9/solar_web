function toggleCalculator(show) {
            const modal = document.getElementById('calc-modal');
            if (show) {
                modal.classList.add('active');
                calculateSavings();
            } else {
                modal.classList.remove('active');
            }
        }

        function calculateSavings() {
            const monthlyBill = parseFloat(document.getElementById('monthly-bill').value) || 0;
            const annualSaving = monthlyBill * 12 * 0.7;
            const estimatedInvestment = (monthlyBill * 70);
            const paybackYears = annualSaving > 0 ? estimatedInvestment / annualSaving : 0;
            const co2Saved = (annualSaving / 0.15) * 0.4;

            animateValue("annual-saving", annualSaving, "€");
            document.getElementById("payback-years").innerText = paybackYears > 0 ? paybackYears.toFixed(1) + " años" : "0 años";
            document.getElementById("co2-saved").innerText = Math.round(co2Saved).toLocaleString();
        }

        function animateValue(id, value, suffix = "") {
            const obj = document.getElementById(id);
            if (!obj) return;
            let start = 0;
            const end = value;
            const duration = 800;
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerText = suffix + Math.floor(progress * end).toLocaleString();
                if (progress < 1) window.requestAnimationFrame(step);
            };
            window.requestAnimationFrame(step);
        }

        function showView(viewName, targetSectionId = null) {
            document.querySelectorAll('.view-section').forEach(view => view.classList.remove('active'));
            if (viewName === 'main') {
                document.getElementById('main-view').classList.add('active');
                if (targetSectionId) {
                    setTimeout(() => {
                        const target = document.getElementById(targetSectionId);
                        if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                    }, 100);
                } else window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (viewName === 'catalogo') {
                document.getElementById('catalogo-view').classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        const nav = document.getElementById('main-nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
        }, { threshold: 0.15 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        document.getElementById('ecoForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            btn.innerText = 'ENVIANDO...';
            setTimeout(() => {
                btn.innerText = 'ENVIADO';
                e.target.reset();
            }, 1500);
        });
