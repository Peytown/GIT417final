"use strict";

document.documentElement.classList.add("js");

    document.addEventListener("DOMContentLoaded", function () {

    // 1. Album scroll reveal //

    const revealEls = document.querySelectorAll(".reveal");

    // Fallback: if IntersectionObserver isn't supported, show everything
    if (!("IntersectionObserver" in window)) {
        revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
        const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Stagger delay from HTML: data-delay="160"
                const delay = Number(entry.target.dataset.delay || 0);

                // Set CSS custom property (--d) for transition delay
                entry.target.style.setProperty("--d", `${delay}ms`);

                // Trigger animation
                entry.target.classList.add("is-visible");

                // Animate once
                obs.unobserve(entry.target);
            }
            });
        },
        { threshold: 0.12 }
        );

        revealEls.forEach((el) => observer.observe(el));
    }


// 2. Theme toggle mode (day/night)

    const themeButton = document.getElementById("themeButton");
    const STORAGE_KEY = "adoTheme";

    function applyTheme(mode) {
        if (mode === "dark") {
        document.body.classList.add("dark");
        if (themeButton) themeButton.textContent = "☀️";
        } else {
        document.body.classList.remove("dark");
        if (themeButton) themeButton.textContent = "🌙";
        }
    }

    // Apply saved theme immediately on page load
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    applyTheme(savedTheme === "dark" ? "dark" : "light");

    // Toggle + save
    if (themeButton) {
        themeButton.addEventListener("click", function () {
        const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
        localStorage.setItem(STORAGE_KEY, newTheme);
        applyTheme(newTheme);
        });
    }

// 3. Fan Challenge (Guessing Game + Random Wallpaper Win)

    const gameForm = document.getElementById("gameForm");
    const guessInput = document.getElementById("guessInput");
    const gameError = document.getElementById("gameError");
    const gameResult = document.getElementById("gameResult");

    // Wallpaper options (user wins -> randomly choose one)
    // credit for images:
    // https://www.tokyohive.com/article/2024/10/ado-celebrates-her-birthday-with-new-single-sakura-biyori-and-time-machine-featuring-hatsune-miku
    // https://www.reddit.com/r/ADO/comments/1cq6q17/ado_in_wallpaper_engine/
    // https://steamcommunity.com/sharedfiles/filedetails/?id=3385561987
    // https://www.uscannenbergmedia.com/2024/03/30/ados-wish-tour-a-shot-of-adrenaline-from-an-faceless-voice/
    // https://cnalifestyle.channelnewsasia.com/entertainment/ado-singapore-concert-2025-hibana-465421

    const wallpapers = [
        { src: "images/w1.jpg", alt: "Ado-themed digital wallpaper 1" },
        { src: "images/w2.jpg", alt: "Ado-themed digital wallpaper 2" },
        { src: "images/w3.jpg", alt: "Ado-themed digital wallpaper 3" },
        { src: "images/w4.jpg", alt: "Ado-themed digital wallpaper 4" },
        { src: "images/w5.jpg", alt: "Ado-themed digital wallpaper 5" }
    ];

    if (gameForm && guessInput && gameError && gameResult) {
        gameForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Clear previous messages
        gameError.textContent = "";
        gameResult.innerHTML = "";

        const guess = Number(guessInput.value);

        // Validate guess is a whole number 1–10
        if (!Number.isInteger(guess) || guess < 1 || guess > 10) {
            gameError.textContent = "Please enter a whole number between 1 and 10.";
            return;
        }

        // Random number between 1 and 10 (inclusive)
        const randomNum = Math.floor(Math.random() * 10) + 1;

        const win = guess === randomNum;

        // Always show the outcome text
        let resultHTML =
            `<p><strong>Your guess:</strong> ${guess}</p>
            <p><strong>Hidden number:</strong> ${randomNum}</p>
            <p><strong>${win ? "You won!" : "Not a match."}</strong> ${win ? "Enjoy your wallpaper!" : "Try again!"}</p>`;

        // If user wins, pick a random wallpaper and display it
        if (win) {
            const pickIndex = Math.floor(Math.random() * wallpapers.length);
            const chosen = wallpapers[pickIndex];

            resultHTML +=
            `<div class="win-wallpaper">
                <img src="${chosen.src}" alt="${chosen.alt}">
            </div>`;
        }

        gameResult.innerHTML = resultHTML;

        // Reset input for next play
        guessInput.value = "";
        guessInput.focus();
        });
    }


// 4. Albums: click card -> show featured detail + tracklist

    const albumGrid = document.getElementById("albumGrid");
    const albumDetail = document.getElementById("albumDetail");
    const detailImg = document.getElementById("detailImg");
    const detailTitle = document.getElementById("detailTitle");
    const detailMeta = document.getElementById("detailMeta");
    const detailTracks = document.getElementById("detailTracks");
    const detailClose = document.getElementById("detailClose");

    const albumData = [
    {
        title: "Kyōgen",
        year: 2022,
        cover: "images/kyougen.jpg",
        alt: "Kyōgen album cover",
        tracks: ["Readymade", "Odo", "Domestic De Violence", "FREEDOM", "Fireworks", "Aitakute", "Lucky Bruto", "Gira Gira", 
            "Ashura-chan", "Kokoro to iu Na no Fukakai", "Usseewa", "Motherland", "Kagakushu", "Yoru no Pierrot"]
    },
    {
        title: "Uta no Uta",
        year: 2022,
        cover: "images/uta.jpg",
        alt: "Uta no Uta album cover",
        tracks: ["New Genesis", "I'm Invincible", "Backlight", "Fleeting Lullaby", "Tot Musica", "The World's Continuation",
             "Where the Wind Blows", "Binks' Sake"]
    },
    {
        title: "Utattemita",
        year: 2023,
        cover: "images/utattemita.jpg",
        alt: "Utattemita album cover",
        tracks: ["Dried Flowers", "Kazari Janai no yo Namida wa", "Aishite Aishite Aishite", "Tsumi to Batsu", "Kawaikute Gomen", "Villain", 
            "God-ish", "unravel", "Buriki No Dance", "Dawn and Fireflies"]
    },
    {
        title: "Ready For My Show",
        year: 2024,
        cover: "images/wish.jpg",
        alt: "Ready For My Show album cover",
        tracks: ["Show", "Usseewa", "New Genesis", "Backlight", "Odo", "Kura Kura", "unravel", "I'm invincible", "Fleeting Lullaby", 
            "Lucky Bruto", "Tot Musica", "Ashura-chan", "Gira Gira", "Motherland", "FREEDOM", "Readymade", "Where the Wind Blows", 
            "Aishite Aishite Aishite", "Rebellion", "I'm a Controversy", "All Night Radio", "Yoru No Pierrot", "Kokoro to iu Na no Fukakai", 
            "Show (Jax Jones Remix)"]
    },
    {
        title: "Zanmu",
        year: 2024,
        cover: "images/zanmu.jpg",
        alt: "Zanmu album cover",
        tracks: ["Nukegara", "missing", "DIGNITY", "Chocolat Cadabra", "Kura Kura", "I'm a Controversy", "Rebellion", "All Night Radio", 
            "Himawari", "Eien No Akuruhi", "MIRROR", "RuLe", "Show", "Ibara", "Value", "0"]
    },
    {
        title: "Ado's Best Adobum",
        year: 2025,
        cover: "images/adobum.jpg",
        alt: "Ado's Best Adobum album cover",
        tracks: ["Usseewa","Ashura-chan","Yoru No Pierrot","Kura Kura","Chocolat Cadabra","Unravel","I'm Invincible","Fleeting Lullaby",
            "Motherland","Himawari","New Genesis","Gira Gira","RuLe","Episode X","Freedom","Rockstar","Show","Ibara","Value",
            "KokoroToIuNaNoFukakai","Shoka","Hello Signals","Backlight","Rebellion","Mirror","I'm a Controversy","Missing",
            "Aishite Aishite Aishite","Tot Musica","Dignity","Aitakute","Elf","Eien No Akuruhi","Readymade","Lucky Bruto","Kagakushu",
            "All Night Radio","Bouquet for Me","Odo","Sakura Biyori and Time Machine with Hatsune Miku"]
    }
    ];

    function openAlbum(index, clickedCard) {
    const a = albumData[index];
    if (!a) return;

    // click outside of album selected -> drops the selected album as if pressed close button
    document.addEventListener("pointerdown", (e) => {
        // If detail isn't open, do nothing
        if (albumDetail.hidden) return;

        // If you clicked inside the detail panel, do nothing
        if (albumDetail.contains(e.target)) return;

        // If you clicked an album card, do nothing (album click handler will run)
        if (e.target.closest(".album-card")) return;

        // Otherwise, you clicked "outside" => close
    closeAlbumDetail();
});

    // Populate panel
    detailImg.src = a.cover;
    detailImg.alt = a.alt || `${a.title} album cover`;
    detailTitle.textContent = `${a.title} (${a.year})`;
    detailMeta.textContent = a.meta || "";

    // Build track list
    detailTracks.innerHTML = "";
    a.tracks.forEach((t) => {
        const li = document.createElement("li");
        li.textContent = t;
        detailTracks.appendChild(li);
    });

    // Show panel
    albumDetail.hidden = false;

    // Highlight selected card
    document.querySelectorAll(".album-card.is-active").forEach(c => c.classList.remove("is-active"));
    if (clickedCard) clickedCard.classList.add("is-active");

    // Bring panel into view
    albumDetail.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function closeAlbum() {
    albumDetail.hidden = true;
    document.querySelectorAll(".album-card.is-active").forEach(c => c.classList.remove("is-active"));
    }

    if (albumGrid) {
    albumGrid.addEventListener("click", (e) => {
        const card = e.target.closest(".album-card");
        if (!card) return;
        openAlbum(Number(card.dataset.album), card);
    });

    albumGrid.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        const card = e.target.closest(".album-card");
        if (!card) return;
        e.preventDefault();
        openAlbum(Number(card.dataset.album), card);
    });
    }

    if (detailClose) {
    detailClose.addEventListener("click", closeAlbum);
    }





// 5. Contact Form Validation + Customer Object

    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    // Inputs
    const fullName = document.getElementById("fullName");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const comments = document.getElementById("comments");
    const formSuccess = document.getElementById("formSuccess");

    // Error message <p> elements
    const nameError = document.getElementById("nameError");
    const phoneError = document.getElementById("phoneError");
    const emailError = document.getElementById("emailError");
    const contactMethodError = document.getElementById("contactMethodError");
    const commentsError = document.getElementById("commentsError");

    // Regex patterns
    const phoneRegex =
        /^\s*(?:\+?1\s*)?(?:\(\s*\d{3}\s*\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}\s*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function clearErrors() {
        nameError.textContent = "";
        phoneError.textContent = "";
        emailError.textContent = "";
        contactMethodError.textContent = "";
        commentsError.textContent = "";
        if (formSuccess) formSuccess.textContent = "";
    }

    function getSelectedContactMethod() {
        const selected = document.querySelector(
        'input[name="contactMethod"]:checked'
        );
        return selected ? selected.value : "";
    }

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors();

        let isValid = true;

        const nameValue = fullName.value.trim();
        const phoneValue = phone.value.trim();
        const emailValue = email.value.trim();
        const commentsValue = comments.value.trim();
        const contactMethod = getSelectedContactMethod();

        // Required: name
        if (nameValue.length === 0) {
        nameError.textContent = "Please enter your full name.";
        isValid = false;
        }

        // Required: comments
        if (commentsValue.length === 0) {
        commentsError.textContent = "Please enter a comment or message.";
        isValid = false;
        }

        // Required: contact method
        if (contactMethod === "") {
        contactMethodError.textContent = "Please choose phone or email.";
        isValid = false;
        } else {
        // required based on contact method
        if (contactMethod === "phone") {
            if (phoneValue.length === 0) {
            phoneError.textContent =
                "Phone number is required if you choose phone.";
            isValid = false;
            } else if (!phoneRegex.test(phoneValue)) {
            phoneError.textContent =
                "Please enter a valid phone number (ex: 123-456-7890).";
            isValid = false;
            }
        }

        if (contactMethod === "email") {
            if (emailValue.length === 0) {
            emailError.textContent =
                "Email is required if you choose email.";
            isValid = false;
            } else if (!emailRegex.test(emailValue)) {
            emailError.textContent =
                "Please enter a valid email address (ex: name@example.com).";
            isValid = false;
            }
        }
        }

        if (!isValid) return;

        // Build customer object from validated input
        const customer = {
        fullName: nameValue,
        phone: phoneValue,
        email: emailValue,
        preferredContact: contactMethod,
        comments: commentsValue
        };

        // Display success message using customer object
        if (formSuccess) {
        const preferredLine =
            customer.preferredContact === "phone"
            ? `<p><strong>Preferred Contact:</strong> Phone (${customer.phone})</p>`
            : `<p><strong>Preferred Contact:</strong> Email (${customer.email})</p>`;

        formSuccess.innerHTML =
            `<h3>Thanks, ${customer.fullName}!</h3>
            <p>Your message was submitted successfully.</p>
            ${preferredLine}
            <p><strong>Your Comments:</strong> ${customer.comments}</p>`;
        }

        contactForm.reset();
        });
    });



    // 6. hero slideshow

    const heroImages = [
        "images/concert.jpg",
        "images/concert2.jpeg",
        "images/concert5.jpg",
        "images/concert4.jpg",
        "images/concert6.jpg",
        "images/concert3.jpg"
        ];

    const heroAltText = [
        "Ado performing live on stage",
        "Wide arena shot of Ado performance",
        "Crowd cheering at Ado concert",
        "Wide angle shot, blue stage lighting over main stage",
        "Crowd angle shot, purple lighting",
        "Ado performing alongside Hatsune Miku"
    ];

    const heroSlide = document.getElementById("heroSlide");

    if (heroSlide) {
    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % heroImages.length;

        heroSlide.style.opacity = 0;

        setTimeout(() => {
        heroSlide.src = heroImages[currentIndex];
        heroSlide.alt = heroAltText[currentIndex];
        heroSlide.style.opacity = 1;
        }, 400);

    }, 6000); // change slides every 6 seconds
    }

// 7. ALBUM COVER DIMMING

//big comments for future reference:
// The container that holds all album cards
// const albumGrid = document.getElementById("albumGrid");
// // All individual album cards
// const albumCards = albumGrid.querySelectorAll(".album-card");
// // The expandable detail panel
// const albumDetail = document.getElementById("albumDetail");
// // The close button inside the detail panel
// const detailClose = document.getElementById("detailClose");
//basically just calling everything previous

//this function contains:
// 1. Marking the clicked album as active
// 2. Dimming the other albums
// 3. Showing and animating the detail panel

const albumGrid7 = document.getElementById("albumGrid");
const albumCards7 = albumGrid7 ? albumGrid7.querySelectorAll(".album-card") : [];

const albumDetail7 = document.getElementById("albumDetail");
const detailClose7 = document.getElementById("detailClose");

function openAlbumDetail(card) {
    // remove active state from all cards first
        albumCards7.forEach(c => c.classList.remove("is-active"));
        // marks the clicked card as active
        card.classList.add("is-active");

        // dim the rest, CSS uses this class to fade the non-active albums
        albumGrid7.classList.add("is-dimming");

        // show detail + animate in, (removes the [hidden] attribute so it's rendered)
        albumDetail7.hidden = false;

        // force a reflow so the transition triggers reliably. this ensures that when the animation class is called next, the transition\
        // will properly trigger instead of being skipped.
        albumDetail7.offsetHeight;

        // add the class that triggers the fade/slide animation
        albumDetail7.classList.add("is-open");
}

//this next part closes the album detail. basically reverses the animation, removes the active/dim state, and hides the panel after the animation ends
function closeAlbumDetail() {
    // start the fade-out / slide-down animation
    albumDetail7.classList.remove("is-open");

    // after animation, hide + clear active/dim
    window.setTimeout(() => {
        albumDetail7.hidden = true;
        albumCards7.forEach(c => c.classList.remove("is-active"));
        albumGrid7.classList.remove("is-dimming");
    }, 260);
}

albumCards7.forEach(card => {
    card.addEventListener("click", () => {
        // click the active album again -> closes it
        const isOpen = !albumDetail7.hidden;
        const isSameCard = card.classList.contains("is-active");

        if (isOpen && isSameCard) {
            closeAlbumDetail();
            return;
        }

        openAlbumDetail(card);
    });
});

if (detailClose7) {
    detailClose7.addEventListener("click", closeAlbumDetail);
}

// Allows closing the detail view by pressing esc.
document.addEventListener("keydown", (e) => {

  if (e.key === "Escape" && !albumDetail7.hidden) {
    closeAlbumDetail();
  }

});

// click outside of album selected -> drops the selected album as if pressed close button
document.addEventListener("pointerdown", (e) => {
    // If detail isn't open, do nothing
    if (albumDetail7.hidden) return;

    // If you clicked inside the detail panel, do nothing
    if (albumDetail7.contains(e.target)) return;

    // If you clicked an album card, do nothing (album click handler will run)
    if (e.target.closest(".album-card")) return;

    // Otherwise, you clicked "outside" => close
    closeAlbumDetail();
});



    

