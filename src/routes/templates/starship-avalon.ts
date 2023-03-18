/**
 * USERNAME
 * USER_ID
 * CARD_INFO
 * RANK
 * CHART_FULL_GRAPH
 * CHART_HALF_GRAPH
 * CHART_RECORD_HITS
 *
 * < Fill this with 'style="animation: Anim 3s linear infinite 0s" only >
 * CORE_PANEL_A
 * CORE_PANEL_B
 * CORE_PANEL_C
 * CORE_PANEL_D
 * CORE_PANEL_E
 * CORE_PANEL_F
 * CORE_PANEL_G
 * CORE_PANEL_H
 *
 * STATS_RECORD
 * GRAPH_DATA
 *
 * */
export const bottom = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1555 856" id="main-card">
  <path d="M 0 0 h 1555 v 856 H 0 Z" fill="none" stroke="none" />

  <!-- Background cover -->
  <path d="M 80 50 H 1480 L 1510 90 V 780 Q 1512 780, 1500 800 H 60 Q 45 800, 45 785 V 85 Z" stroke="none" fill="rgba(68, 68, 70, 1)" />

  <g>
    <!-- outline-boundary -->
    <polygon points="45 198 80 235 80 460 45 495" fill="rgba(167, 202, 224, 0.4)" stroke="rgb(126, 191, 219)" stroke-width="4" />
    <polygon points="1508 205 1475 235 1475 460 1508 495" fill="rgba(167, 202, 224, 0.4)" stroke="rgb(126, 191, 219)" stroke-width="4" />
    <polygon points="500 802 530 760 1030 760 1070 802" fill="rgba(167, 202, 224, 0.4)" stroke="rgb(126, 191, 219)" stroke-width="4" />
    <path d="M 80 47 L 45 85 V 775 Q 45 800, 70 800 H 500 L 530 760 H 1030 L 1070 800 H 1485 Q 1510 800, 1510 775 V 88 L 1480 47 H 980 L 935 88 V 158" fill="transparent" stroke="rgb(167, 202, 224)" stroke-width="8" stroke-linejoin="round" />
    <circle cx="87" cy="41" r="12" fill="none" stroke="rgb(167,202,224)" stroke-width="8" />
    <circle cx="935" cy="164" r="8" fill="none" stroke="rgb(167,202,224)" stroke-width="8" />
  </g>
  <g>
    <!-- Title Div -->
    <path d="M 917 198 H 265" stroke="rgb(174, 174, 178)" fill="none" stroke-width="3" stroke-dasharray="20, 5" />
  </g>
  <g>
    <!--  Reactor Section -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" x="1010" y="105" width="420">
      <style>
        :root {
        --backplate-stroke: rgb(63, 125, 150);
        --backplate-fill: rgb(174, 174, 178);
        --backplate-stroke-f: rgb(63, 125, 150);
        --backplate-fill-f: rgb(174, 174, 178);
        --coil-color: rgb(174, 174, 178);
        --coil-outline: none;
        --base-color: rgb(68, 68, 70);
        }

        @keyframes Anim {
          0% {
            --backplate-fill: rgb(174, 174, 178);
            --backplate-stroke: rgb(63, 125, 150);
          }
          100% {
            --backplate-fill: rgb(215, 0, 21);
            --backplate-stroke: rgb(194, 6, 24);
          }
        }
      </style>
      <defs>
        <g id="coil">
          <!-- Inner Coil -->
          <path d="M 100.6 73.7 L 108.4 84.8 C 112 90, 112 90 110.5 83.3 L 107.9 70.7 Z" fill="var(--backplate-fill-f)" stroke="var(--backplate-stroke-f)" />

          <!-- Outisde Coil -->
          <path d="M 131 110.8 Q 135.4 111.3, 138.9 114.2 L 144 107 Q 139.1 103.2, 133 102 Z" fill="var(--coil-color)" stroke="var(--coil-outline)" />
        </g>

        <g id="backplate">
          <use href="#coil" />

          <g>
            <!-- Frame -->
            <path d="M 144 11 L 133 80 L 122 80 L 112 11 L 104 12 Q 100 13, 101 17 L 109 65 L 116 89.8 Q 127.5 86.3 ,139 89.5 L 146 65 L 155 17 Q 156 13 152 12 Z" fill="var(--backplate-fill)" stroke="var(--backplate-stroke)" />
            <path d="M 125 83 C 123 83, 123 86, 125 86 L 131 86 C 133 86, 133 83, 131 83 Z" fill="var(--backplate-fill-f)" stroke="var(--backplate-stroke)" />
          </g>

          <g id="idk">
            <!-- Long bar -->
            <path d="M 78 130 L 73 132 L 14 132 L 14 124 L 73 124 L 78 126 Z" fill="var(--backplate-fill-f)" stroke="var(--backplate-stroke-f)" />
            <path d="M 78 126 L 78 130 H 5 V 126 Z" fill="var(--base-color)" stroke="var(--backplate-stroke-f)" />
          </g>
          <g>
            <!-- Short Bar -->
            <path d="M 69 100 L 26 81 Q 20.4 83.5, 23 89 L 66 107 Z" fill="var(--backplate-fill-f)" stroke="var(--backplate-stroke-f)" />
            <path d="M 22 86 L 62.5 102.6 L 63.5 100.5 L 23.5 82.8" fill="var(--base-color)" stroke="var(--backplate-stroke-f)" />
          </g>
        </g>

        <!-- Bar inside -->
        <path id="bar-idk" d="M 126 91 V 101 Q 128 100.8 ,130 101 V 91 Z" fill="var(--backplate-fill-f)" stroke="var(--backplate-stroke-f)" />
        <g id="batch-bars">
          <use href="#bar-idk" transform="rotate(0, 128, 128)" />
          <use href="#bar-idk" transform="rotate(90, 128, 128)" />
          <use href="#bar-idk" transform="rotate(180, 128, 128)" />
          <use href="#bar-idk" transform="rotate(270, 128, 128)" />
        </g>
        <g id="bars-inside">
          <use href="#batch-bars" transform="rotate(0, 128, 128)" />
          <use href="#batch-bars" transform="rotate(20, 128, 128)" />
          <use href="#batch-bars" transform="rotate(40, 128, 128)" />
          <use href="#batch-bars" transform="rotate(60, 128, 128)" />
          <use href="#batch-bars" transform="rotate(80, 128, 128)" />
        </g>

        <!-- Bar outside -->
        <polygon id="bar-idk-outside" points="127 32 127 23 129 23 129 32" fill="var(--backplate-fill-f)" stroke="var(--backplate-stroke-f)" transform="rotate(5, 128, 128)" />
        <g id="batch-bars-outside">
          <use href="#bar-idk-outside" transform="rotate(0, 128, 128)" />
          <use href="#bar-idk-outside" transform="rotate(12, 128, 128)" />
          <use href="#bar-idk-outside" transform="rotate(22.5, 128, 128)" />
          <use href="#bar-idk-outside" transform="rotate(35, 128, 128)" />
        </g>
        <g id="bars-outside">
          <use href="#batch-bars-outside" transform="rotate(0, 128, 128)" />
          <use href="#batch-bars-outside" transform="rotate(90, 128, 128)" />
          <use href="#batch-bars-outside" transform="rotate(180, 128, 128)" />
          <use href="#batch-bars-outside" transform="rotate(270, 128, 128)" />
        </g>
      </defs>

      <g>
        <!-- base -->
        <circle cx="128" cy="128" r="107.4" fill="none" stroke-width="1" stroke="var(--backplate-stroke-f)" />
        <use href="#bars-outside" transform="rotate(0, 128, 128)" />
        <use href="#bars-outside" transform="rotate(45, 128, 128)" />
      </g>

      <g>
        <circle cx="128" cy="128" r="60" fill="none" stroke-width="1" stroke="var(--backplate-stroke-f)" />
        <circle cx="128" cy="128" r="44" fill="none" stroke-width="1" stroke="var(--backplate-stroke-f)" />
      </g>

      <g id="backplates">
        <use href="#backplate" transform="rotate(0, 128, 128)" <%= CORE_PANEL_A %> />
        <use href="#backplate" transform="rotate(45, 128, 128)" <%= CORE_PANEL_B %> />
        <use href="#backplate" transform="rotate(90, 128, 128)" <%= CORE_PANEL_C %> />
        <use href="#backplate" transform="rotate(135, 128, 128)" <%= CORE_PANEL_D %> />
        <use href="#backplate" transform="rotate(180, 128, 128)" <%= CORE_PANEL_E %> />
        <use href="#backplate" transform="rotate(225, 128, 128)" <%= CORE_PANEL_F %> />
        <use href="#backplate" transform="rotate(270, 128, 128)" <%= CORE_PANEL_G %> />
        <use href="#backplate" transform="rotate(315, 128, 128)" <%= CORE_PANEL_H %> />
      </g>
      <g>
        <circle cx="128" cy="128" r="3" fill="none" stroke-width="2" stroke="var(--backplate-fill-f)" />
        <circle cx="128" cy="128" r="12" fill="none" stroke-width="5" stroke="var(--backplate-fill-f)" />
        <circle cx="128" cy="128" r="18" fill="none" stroke-width="1" stroke="var(--backplate-fill-f)" />
        <circle cx="128" cy="128" r="26" fill="none" stroke-width="1" stroke="var(--backplate-fill-f)" />
        <circle cx="128" cy="128" r="40" fill="none" stroke-width="1" stroke="var(--backplate-fill-f)" />
      </g>
      <use href="#bars-inside" transform="rotate(0, 128, 128)" />
      <use href="#bars-inside" transform="rotate(10, 128, 128)" />
    </svg>
  </g>

  <g transform="translate(0, -25)">
    <!-- Graph  -->

    <!-- J f M A M J J A S O N D -->
    <path d="M 240 530 V 720 H 930" fill="none" stroke="rgb(167, 202, 224)" stroke-width="5" />

    <path d="M 240 555 H 920" fill="none" stroke="rgb(167, 202, 224)" stroke-width="3" stroke-dasharray="10, 5" />
    <path d="M 240 595 H 920" fill="none" stroke="rgb(167, 202, 224)" stroke-width="3" stroke-dasharray="5, 8" />
    <path d="M 240 635 H 920" fill="none" stroke="rgb(167, 202, 224)" stroke-width="3" stroke-dasharray="10, 5" />
    <path d="M 240 682 H 920" fill="none" stroke="rgb(167, 202, 224)" stroke-width="3" stroke-dasharray="5, 8" />

    <text x="230" y="560" fill="rgb(167, 202, 224)" font-size="35" text-anchor="end" font-family="monospace"><%= CHART_FULL_GRAPH %></text>
    <text x="230" y="640" fill="rgb(167, 202, 224)" font-size="35" text-anchor="end" font-family="monospace"><%= CHART_HALF_GRAPH%></text>
    <text x="230" y="720" fill="rgb(167, 202, 224)" font-size="35" text-anchor="end" font-family="monospace">0</text>

    <g>
      <text x="330" y="760" text-anchor="middle" font-family="monospace" font-size="30" fill="rgb(167, 202, 224)"><%= CHART_RECORD_HITS %> days ago</text>
      <text x="930" y="760" text-anchor="end" font-family="monospace" font-size="30" fill="rgb(167, 202, 224)">Public commits</text>

      <path
        d="<%= GRAPH_DATA %>"
        fill="none"
        stroke-width="3"
        stroke="white"
        />
    </g>
  </g>
  <g>
    <!-- Parameters -->
    <text x="92" y="155" fill="rgb(174, 174, 176)" font-size="80" font-style="italic" font-weight="bold" text-anchor="start" font-family="monospace" style=""><%= USERNAME %></text>

    <!-- Should be 1 - 14? characters -->
    <text x="265" y="205" fill="rgb(174, 174, 178)" font-size="25" font-weight="bold" font-family="monospace" text-anchor="end"><%= CARD_INFO %>//:</text>
    <text x="1020" y="120" fill="rgb(174, 174, 178)" font-size="50" font-weight="bold" font-family="monospace" text-anchor="start">ID: <%= USER_ID %></text>
    <text x="1020" y="190" fill="rgb(174, 174, 178)" font-size="50" font-weight="bold" font-family="monospace" text-anchor="start">Rank: <%= RANK %></text>
    
    <!-- 35 Chars -->
    <%= STATS_RECORD %>
  </g>
</svg>
`;
