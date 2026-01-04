<template>
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            
            <div class="espace-logo">
                <div class="logo-img-block">
                <img src="../assets/images/dgce.png" alt="Logo" class="logo-img-simple" />
                </div>
            </div>
            <p class="footer-text text-center">Construire l'avenir du commerce</p>

            <div class="social-icons">
                <a href="#" class="social-link"><i class="bi bi-arrow-up-circle"></i></a>
            </div>

          </div>
  
          <div class="col-md-3">
          <h5 class="footer-title">LE MINISTÈRE</h5>
          <hr class="foot-hr">
          <ul class="contact-info"> 
              <li> Missions et attributions</li>
              <li> Organisation </li>
              <li> Structures sous tutelle</li>
          </ul>
        </div>
  
          <div class="col-md-3">
            <h5 class="footer-title">Contacts</h5>
            <hr class="foot-hr">

            <ul class="contact-info">

              <li><i class="bi bi-geo-alt-fill"></i> Abidjan-Plateau</li>
              <li class="social-link">
               <a href="tel:+2250708135172"> <i class="bi bi-telephone-fill"></i>+225 0708135172</a>
              </li>
              <li class="social-link">
               <a href="tel:+2250709825303"> <i class="bi bi-telephone-fill"></i>+225 0709825303</a>
              </li>

              <li><i class="bi bi-envelope-fill"></i>comexmap@commerce.gouv.ci</li>
              <li><i class="bi bi-envelope-fill"></i>secretariatdcir@gmail.com</li>

            </ul>
            
          </div>
  
          <div class="col-md-3">
            <h5 class="footer-title">LIENS UTILES</h5>
            <hr class="foot-hr">

            <ul class="useful-links">
              <li>
                <a href="https://www.presidence.ci" class="useful-link" target="_blank">
                  <i class="bi bi-chevron-right"></i>
                  <span>Présidence</span>
                </a>
              </li>
              <li>
                <a href="https://primature.ci" class="useful-link" target="_blank">
                  <i class="bi bi-chevron-right"></i>
                  <span>Primature</span>
                </a>
              </li>
              <li>
                <a href="https://commerce.gouv.ci" class="useful-link" target="_blank">
                  <i class="bi bi-chevron-right"></i>
                  <span>Ministère du Commerce et de l'Industrie</span>
                </a>
              </li>
              <li>
                <a href="https://www.cci.ci" class="useful-link" target="_blank">
                  <i class="bi bi-chevron-right"></i>
                  <span>Chambre de Commerce et d’Industrie</span>
                </a>
              </li>
              <li>
                <a href="https://www.douanes.ci" class="useful-link" target="_blank">
                  <i class="bi bi-chevron-right"></i>
                  <span>Douanes</span>
                </a>
              </li>
              
              <li>
                <a href="https://pwic.gouv.ci" class="useful-link" target="_blank">
                  <i class="bi bi-chevron-right"></i>
                  <span>Pwic</span>
                </a>
              </li>
              <li>
                <a href="https://gudepme.ci" class="useful-link" target="_blank">
                  <i class="bi bi-chevron-right"></i>
                  <span>GUDE-PME</span>
                </a>
              </li>
            </ul>

            <div class="social-icons">
                <!-- <a href="#" class="social-link" target="_blank"><i class="bi bi-facebook"></i></a>
                <a href="#" class="social-link"><i class="bi bi-twitter"></i></a>
                <a href="#" class="social-link"><i class="bi bi-linkedin"></i></a>
                <a href="#" class="social-link"><i class="bi bi-instagram"></i></a> -->
            </div>
          </div>
        </div>
  
        <div class="footer-bottom">
          <p>&copy; Tous droits réservés COMEXMAP {{ new Date().getFullYear() }}</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    data() {
      return {
      };
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .footer {
    background: #000;
    color: #fff;
    padding: 40px 0;
  
  
    .footer-text {
      font-size: 12px !important;
      margin-bottom: 20px;
    }
  
    .footer-title {
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      text-transform: uppercase;
    }
    .foot-hr{
      background: #FF6B07;
      height: 7px;
      opacity: 1;
      width: 25%;
      border: none;

    }
  
    .footer-links {
      list-style: none;
      padding: 0;
  
      li {
        margin-bottom: 8px;
      }
  
      .footer-link {
        color: #86838c;
        text-decoration: none;
        transition: color 0.3s;
        display: flex;
        align-items: center;
  
        i {
          margin-right: 8px;
        }
  
        &:hover {
          color: #ff6b07;
        }
      }
    }
  
    .contact-info {
      list-style: none;
      padding: 0;
      text-align: left;

      a{
        color: #fff;
        text-decoration: none;
      }
  
      li {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        font-size: 14px;
  
        i {
          margin-right: 8px;
          font-size: 16px;
          color: #ff6b07;
        }
      }
    }

    // Nouveaux styles pour les liens utiles
    .useful-links {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 2px;
      }

      .useful-link {
        color: #fff;
        text-decoration: none;
        display: flex;
        align-items: center;
        font-size: 14px;
        transition: all 0.3s ease;
        padding: 8px 0;
        position: relative;

        i {
          font-size: 14px;
          color: #ff6b07;
          margin-right: 10px;
          transition: transform 0.3s ease;
        }

        span {
          transition: transform 0.3s ease;
        }

        &::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background: #ff6b07;
          transition: width 0.3s ease;
        }

        &:hover {
          color: #ff6b07;

          i {
            transform: translateX(5px);
          }

          span {
            transform: translateX(3px);
          }

          &::before {
            width: 100%;
          }
        }
      }
    }
  
    .footer-bottom {
      text-align: center;
      border-top: 1px solid #86838c;
      margin-top: 25px;
      padding-top: 10px;
      font-size: 14px;
    }

    .social-icons {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 15px;
  
      .social-link {
        color: #fff;
        font-size: 18px;
        transition: color 0.3s;
  
        &:hover {
          color: #ff6b07;
        }
      }
    }

    .logo-img-block{
        padding: 5px;
        width: 84px;
        height: 84px;
        margin-bottom: 10px;
        .logo-img-simple {
            width: 100%;
            height: 100%;
        }
    }

}

// Responsive
@media (max-width: 768px) {
  .footer {
    .useful-links {
      .useful-link {
        font-size: 13px;
        padding: 6px 0;
      }
    }
  }
}
  </style>