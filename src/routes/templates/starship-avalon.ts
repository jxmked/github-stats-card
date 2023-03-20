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
 * AFTER_CONTENT
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
    <%= REACTOR %>
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
      <text x="930" y="760" text-anchor="end" font-family="monospace" font-size="30" fill="rgb(167, 202, 224)">Commits</text>

      <path
        d="<%= GRAPH_DATA %>"
        fill="none"
        stroke-width="2"
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
  
  <%= AFTER_CONTENT %>
</svg>
`;

/**
 * ERROR_CONTENT
 * */
export const Error_Banner = `
  <g>
    <path d="M60 250 V 606 H 1495 V 250 z" fill="rgb(126, 191, 219, 0.3)" stroke="rgba(255, 79, 68, 0.7)" stroke-width="10" />
    <text x="777.5" y="428" fill="rgba(255, 49, 38)" font-size="70" font-family="monospace" text-anchor="middle" font-weight="bold"><%= ERROR_CONTENT %></text>
  </g>
`;
