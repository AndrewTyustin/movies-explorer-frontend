import React from "react";

import avatar from "../../assets/images/img-avatar.jpg";

function AboutMe() {
  function calculateAge() {
    const today = new Date();
    const birthDate = new Date(1995, 5, 18);
    const month = today.getMonth() - birthDate.getMonth();
    let age = today.getFullYear() - birthDate.getFullYear();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    let years = String(age);
    if (years >= 11 && years <= 14) {
      years = "лет";
    } else if (years.endsWith("1")) {
      years = "год";
    } else if (
      years.endsWith("2") ||
      years.endsWith("3") ||
      years.endsWith("4")
    ) {
      years = "года";
    } else {
      years = "лет";
    }

    return `${age} ${years}`;
  }

  return (
    <section className="about-me" id="student">
      <div className="wrapper section-wrapper section-wrapper_indent_s">
        <h2 className="section-heading">Студент</h2>
        <div className="about-me__wrapper">
          <div className="about-me__biography">
            <h3 className="section-heading-main about-me__heading">Андрей</h3>
            <p className="about-me__subheading">Фронтенд-разработчик, {calculateAge()}</p>
            <p className="paragraph about-me__paragraph">
              Я живу в Москве, окончил факульет креативных индустрий ВШЭ. С
              2022 года увлекся программированием.
              &laquo;JavaScript/Front-end&raquo;
            </p>
            <a
              className="paragraph-s"
              href="https://github.com/AndrewTyustin"
              rel="noreferrer"
              target="_blank"
            >
              Github
            </a>
          </div>
          <img
            className="avatar"
            src={avatar}
            alt="Андрей Тюстин, веб-разработчик"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
