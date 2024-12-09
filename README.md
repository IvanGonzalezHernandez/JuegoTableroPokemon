# Juego Tablero Pokemon
![image](https://github.com/user-attachments/assets/ad474545-3ad3-4f80-a982-5bbf213abf14)
![image](https://github.com/user-attachments/assets/bd1c2554-885f-4839-9c65-f9835703d396)


Este proyecto es un juego de tablero interactivo desarrollado con HTML, CSS y JavaScript. El objetivo del juego es encontrar el tesoro moviendo al héroe por un tablero de 10x10, utilizando tiradas de dados para determinar los movimientos permitidos. El jugador debe mover al héroe por el tablero hasta llegar al tesoro, con la posibilidad de almacenar récords y disfrutar de efectos de sonido.

## Características

- **Validación del Nombre del Jugador:**  
  El nombre del jugador debe ser válido (mínimo 4 caracteres y sin números).
  
- **Generación Dinámica del Tablero:**  
  El tablero de 10x10 se genera de forma dinámica con posiciones fijas para el héroe y el tesoro.
  
- **Sistema de Movimientos:**  
  Los movimientos del héroe son determinados por tiradas de dados. El jugador selecciona una celda para moverse, con el número de movimientos posible determinado por el dado.
  
- **Efectos de Sonido:**  
  Sonidos específicos se reproducen en momentos clave del juego, como la validación del nombre, el lanzamiento del dado y la victoria.
  
- **Registro de Récords:**  
  El juego guarda los récords de las partidas anteriores usando `localStorage`, comparando la cantidad de tiradas realizadas para ganar.

## Requisitos

1. **Navegador:**  
   Cualquier navegador moderno compatible con JavaScript.
   
2. **Archivos Necesarios:**
   - Código fuente (`HTML`, `CSS`, `JavaScript`).
   - Imágenes (`/img/DadoX.png` donde `X` es el número del dado, del 1 al 6).
   - Sonidos (`/sound/desbloquear.mp3`, `/sound/tirarDado.mp3`, `/sound/victoria.mp3`).
   
3. **Uso de Local Storage:**  
   El juego utiliza `localStorage` para guardar los récords entre sesiones.

## Estructura del Proyecto

```plaintext
├── index.html          # Página principal del juego
├── style.css           # Estilo del juego
├── script.js           # Lógica del juego
├── /img                # Carpeta de imágenes (dados y otros gráficos)
│   ├── Dado1.png
│   ├── Dado2.png
│   ├── Dado3.png
│   ├── Dado4.png
│   ├── Dado5.png
│   ├── Dado6.png
│   └── Dado0.png
└── /sound              # Carpeta de sonidos
    ├── desbloquear.mp3
    ├── tirarDado.mp3
    └── victoria.mp3
