import "./AboutMe.css";
import photo from "../../../images/student-photo.jpg";

function AboutMe() {
  return (
    <article className="about-me">
      <img src={photo} alt="Фотография" className="about-me__photo" />
      <div className="about-me__description">
        <h3 className="about-me__name">Андрей</h3>
        <p className="about-me__subtitle">Фронтенд-разработчик, 28&nbsp;лет</p>
        <p className="about-me__text">
          Я живу в Москве, окончил факульет креативных индустрий ВШЭ. С 2022
          года увлекаюсь программированием. &laquo;JavaScript/Front-end&raquo;
        </p>
        <ul className="about-me__link-list">
          <li className="about-me__link-list-item">
            <a
              href="https://github.com/AndrewTyustin"
              className="about-me__link"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </article>
  );
}

export default AboutMe;
