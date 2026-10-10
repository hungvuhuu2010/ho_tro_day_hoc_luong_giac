document.addEventListener("DOMContentLoaded", () => {
  // ================= 1. QUẢN LÝ CHUYỂN TAB =================
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.tab;
      const target = document.getElementById(targetId);

      // Tab chưa có nội dung (ví dụ tab3) thì không làm ứng dụng báo lỗi.
      if (!target) return;

      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      target.classList.add("active");
    });
  });

  // ================= 2. XỬ LÝ THẺ 1 (NỬA ĐƯỜNG TRÒN) =================
  const sliderT1 = document.getElementById("sliderT1");
  const angleValT1 = document.getElementById("angleValT1");
  const coordM = document.getElementById("coordM");
  const cosVal = document.getElementById("cosVal");
  const sinVal = document.getElementById("sinVal");
  const tanVal = document.getElementById("tanVal");
  const cotVal = document.getElementById("cotVal");

  const radiusOM = document.getElementById("radiusOM");
  const dotM = document.getElementById("dotM");
  const labelM = document.getElementById("labelM");
  const projX = document.getElementById("projX");
  const projY = document.getElementById("projY");
  const arcT1 = document.getElementById("arcT1");

  // Khai báo nút chọn nhanh góc đặc biệt.
  const presetBtns = document.querySelectorAll(".btn-preset");

  // Khai báo các nút & khối ẩn/hiện.
  const toggleTrigBtn = document.getElementById("toggleTrigBtn");
  const trigBlock = document.getElementById("trigBlock");
  const toggleProjBtn = document.getElementById("toggleProjBtn");
  const projLabelsGroup = document.getElementById("projLabelsGroup");

  // Khai báo chân hình chiếu H và K.
  const dotH = document.getElementById("dotH");
  const labelH = document.getElementById("labelH");
  const dotK = document.getElementById("dotK");
  const labelK = document.getElementById("labelK");

  const R = 150; // Bán kính đường tròn trên SVG.

  // Hàm ẩn khối giá trị lượng giác và reset trạng thái nút.
  function hideTrigValues() {
    if (!trigBlock) return;
    trigBlock.classList.add("hidden");

    if (toggleTrigBtn) {
      toggleTrigBtn.textContent = "👁️ Hiện giá trị lượng giác";
    }
  }

  function updateTab1(deg) {
    if (!sliderT1 || !angleValT1 || !radiusOM || !dotM || !labelM ||
        !projX || !projY || !arcT1) {
      return;
    }

    angleValT1.textContent = deg;
    const rad = (deg * Math.PI) / 180;

    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const cx = R * cos;
    const cy = -R * sin;

    // Cập nhật M & OM.
    radiusOM.setAttribute("x2", cx);
    radiusOM.setAttribute("y2", cy);
    dotM.setAttribute("cx", cx);
    dotM.setAttribute("cy", cy);

    labelM.setAttribute("x", cx + (cx >= 0 ? 10 : -25));
    labelM.setAttribute("y", cy - 10);

    // Đường chiếu.
    projX.setAttribute("x1", cx);
    projX.setAttribute("y1", cy);
    projX.setAttribute("x2", cx);
    projX.setAttribute("y2", 0);

    projY.setAttribute("x1", cx);
    projY.setAttribute("y1", cy);
    projY.setAttribute("x2", 0);
    projY.setAttribute("y2", cy);

    // Cập nhật Chân hình chiếu H (trên Ox).
    if (dotH && labelH) {
      dotH.setAttribute("cx", cx);
      dotH.setAttribute("cy", 0);
      labelH.setAttribute("x", cx);
      labelH.setAttribute("y", 22);
      labelH.textContent = `x = ${cos.toFixed(3)}`;
    }

    // Cập nhật Chân hình chiếu K (trên Oy).
    if (dotK && labelK) {
      dotK.setAttribute("cx", 0);
      dotK.setAttribute("cy", cy);
      labelK.setAttribute("x", cx >= 0 ? -10 : 10);
      labelK.setAttribute("y", cy + 4);
      labelK.setAttribute("text-anchor", cx >= 0 ? "end" : "start");
      labelK.textContent = `y = ${sin.toFixed(3)}`;
    }

    // Cung góc α.
    const arcR = 40;
    const ax = arcR * cos;
    const ay = -arcR * sin;
    const largeArcFlag = deg > 180 ? 1 : 0;
    arcT1.setAttribute(
      "d",
      `M ${arcR},0 A ${arcR},${arcR} 0 ${largeArcFlag},0 ${ax},${ay}`
    );

    // Giá trị tọa độ M. index.html hiện tại không có #coordM,
    // nên kiểm tra null để không phát sinh lỗi JavaScript.
    if (coordM) {
      coordM.textContent = `M(${cos.toFixed(2)}, ${sin.toFixed(2)})`;
    }

    if (cosVal) cosVal.textContent = cos.toFixed(3);
    if (sinVal) sinVal.textContent = sin.toFixed(3);

    if (tanVal) {
      if (Math.abs(cos) < 1e-10) {
        tanVal.textContent = "Không xác định";
      } else {
        tanVal.textContent = Math.tan(rad).toFixed(3);
      }
    }

    if (cotVal) {
      if (Math.abs(sin) < 1e-10) {
        cotVal.textContent = "Không xác định";
      } else {
        cotVal.textContent = (1 / Math.tan(rad)).toFixed(3);
      }
    }
  }

  // ================= 2.1. SỰ KIỆN THẺ 1 =================
  if (toggleTrigBtn && trigBlock) {
    toggleTrigBtn.addEventListener("click", () => {
      const isHidden = trigBlock.classList.toggle("hidden");
      toggleTrigBtn.textContent = isHidden
        ? "👁️ Hiện giá trị lượng giác"
        : "🙈 Ẩn giá trị lượng giác";
    });
  }

  if (toggleProjBtn && projLabelsGroup) {
    toggleProjBtn.addEventListener("click", () => {
      const isHidden = projLabelsGroup.classList.toggle("hidden");
      toggleProjBtn.textContent = isHidden
        ? "📍 Hiện tọa độ x, y"
        : "📍 Ẩn tọa độ x, y";
    });
  }

  if (sliderT1) {
    sliderT1.addEventListener("input", (e) => {
      hideTrigValues();
      updateTab1(Number(e.target.value));
    });
  }

  presetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const angle = Number(btn.dataset.angle);

      if (sliderT1) sliderT1.value = angle;
      hideTrigValues();
      updateTab1(angle);
    });
  });

  // Khởi tạo Thẻ 1 đúng một lần.
  updateTab1(60);

  // ================= 3. XỬ LÝ THẺ 2 (TỔNG QUÁT) =================
  const input = document.getElementById("angleInput");
  const unitSelect = document.getElementById("unitSelect");
  const animateBtn = document.getElementById("animateBtn");
  const resetBtn = document.getElementById("resetBtn");

  const currentAngleEl = document.getElementById("currentAngle");
  const directionEl = document.getElementById("direction");
  const statusEl = document.getElementById("status");
  const turnsEl = document.getElementById("turns");

  const anglePath = document.getElementById("anglePath");
  const finalRay = document.getElementById("finalRay");
  const tipDot = document.getElementById("tipDot");
  const pointMLabel = document.getElementById("pointMLabel");
  const angleLabelGroup = document.getElementById("angleLabelGroup");
  const angleLabelBg = document.getElementById("angleLabelBg");
  const angleLabel = document.getElementById("angleLabel");
  const rotationLabel = document.getElementById("rotationLabel");

  const RAY_LENGTH = 270;
  const ARC_BASE = 82;
  let animationId = null;
  let runToken = 0;

  function fmt(n) {
    if (Math.abs(n) < 1e-9) return "0";
    return Number(n.toFixed(2)).toString();
  }

  function degToRad(deg) {
    return (deg * Math.PI) / 180;
  }

  function pointAt(angleDeg, radius) {
    const t = degToRad(angleDeg);
    return {
      x: radius * Math.cos(t),
      y: -radius * Math.sin(t)
    };
  }

  function buildAnglePath(angleDeg) {
    const absAngle = Math.abs(angleDeg);
    if (absAngle < 0.001) return "";

    const samples = Math.max(30, Math.ceil(absAngle / 3));
    const points = [];

    for (let i = 0; i <= samples; i++) {
      const p = i / samples;
      const a = angleDeg * p;
      const radius = ARC_BASE + Math.min(48, Math.floor(Math.abs(a) / 360) * 13);
      points.push(pointAt(a, radius));
    }

    let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;

    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x.toFixed(2)} ${points[i].y.toFixed(2)}`;
    }

    return d;
  }

  function setFinalRay(angleDeg, visible = true) {
    if (!finalRay || !tipDot || !pointMLabel) return;

    const p = pointAt(angleDeg, RAY_LENGTH);

    finalRay.setAttribute("x2", p.x);
    finalRay.setAttribute("y2", p.y);

    tipDot.setAttribute("cx", p.x);
    tipDot.setAttribute("cy", p.y);

    pointMLabel.setAttribute("x", p.x + 12);
    pointMLabel.setAttribute("y", p.y - 12);

    const opacityVal = visible ? "1" : "0";
    finalRay.setAttribute("opacity", opacityVal);
    tipDot.setAttribute("opacity", opacityVal);
    pointMLabel.setAttribute("opacity", opacityVal);
  }

  function positionAngleLabel(angleDeg) {
    if (!angleLabelGroup || !angleLabelBg || !angleLabel) return;

    const absAngle = Math.abs(angleDeg);
    const radius = ARC_BASE + Math.min(48, Math.floor(absAngle / 360) * 13) + 30;
    const p = pointAt(angleDeg, radius);

    const x = Math.max(-350, Math.min(350, p.x));
    const y = Math.max(-250, Math.min(250, p.y));

    angleLabelGroup.setAttribute("transform", `translate(${x} ${y})`);
    angleLabelBg.setAttribute("x", "-70");
    angleLabelBg.setAttribute("y", "-34");
    angleLabelBg.setAttribute("width", "140");
    angleLabel.textContent = `${fmt(angleDeg)}°`;
  }

  function updateTurnInfo(angleDeg) {
    if (!turnsEl) return;

    const absAngle = Math.abs(angleDeg);
    const fullTurns = Math.floor(absAngle / 360);
    const rem = absAngle % 360;

    if (absAngle === 0) {
      turnsEl.textContent = "0 vòng";
      return;
    }

    if (rem < 0.01) {
      turnsEl.textContent = `${fullTurns} vòng`;
    } else if (fullTurns > 0) {
      turnsEl.textContent = `${fullTurns} vòng + ${fmt(rem)}°`;
    } else {
      turnsEl.textContent = `${fmt(rem)}°`;
    }
  }

  function resetVisual() {
    runToken++;

    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }

    if (currentAngleEl) currentAngleEl.textContent = "0°";
    if (directionEl) directionEl.textContent = "—";
    if (statusEl) statusEl.textContent = "Sẵn sàng";
    if (turnsEl) turnsEl.textContent = "0 vòng";

    if (anglePath) {
      anglePath.setAttribute("d", "");
      anglePath.setAttribute("opacity", "0");
    }

    if (finalRay) finalRay.setAttribute("opacity", "0");
    if (tipDot) tipDot.setAttribute("opacity", "0");
    if (pointMLabel) pointMLabel.setAttribute("opacity", "0");
    if (angleLabelGroup) angleLabelGroup.setAttribute("opacity", "0");
    if (rotationLabel) rotationLabel.textContent = "Tia đang chờ quay...";
    if (animateBtn) animateBtn.disabled = false;
  }

  function readAngle() {
    if (!input || !unitSelect) return 0;

    const raw = input.value.trim().toLowerCase();
    if (!raw) return 0;

    let val = 0;

    if (raw.includes("pi")) {
      const replaced = raw
        .replace(/pi/g, Math.PI.toString())
        .replace(/(\d)(Math\.PI)/g, "$1*$2");

      try {
        val = Function(`"use strict"; return (${replaced})`)();
      } catch (e) {
        val = NaN;
      }
    } else {
      val = Number(raw);
    }

    if (!Number.isFinite(val)) return 0;

    return unitSelect.value === "rad" ? val * (180 / Math.PI) : val;
  }

  function animateAngle(targetAngle) {
    if (!currentAngleEl || !directionEl || !statusEl || !anglePath ||
        !angleLabelGroup || !animateBtn) {
      return;
    }

    const token = ++runToken;

    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }

    const duration = Math.min(
      14000,
      Math.max(1200, 1200 + Math.abs(targetAngle) * 8)
    );

    directionEl.textContent =
      targetAngle > 0
        ? "Ngược chiều KĐH"
        : targetAngle < 0
          ? "Theo chiều KĐH"
          : "Không quay";

    updateTurnInfo(targetAngle);
    statusEl.textContent = "Đang quay...";
    animateBtn.disabled = true;

    if (Math.abs(targetAngle) < 0.0001) {
      currentAngleEl.textContent = "0°";
      statusEl.textContent = "Hoàn thành";
      setFinalRay(0, true);
      angleLabelGroup.setAttribute("opacity", "1");
      positionAngleLabel(0);
      animateBtn.disabled = false;
      return;
    }

    const startTime = performance.now();

    function frame(now) {
      if (token !== runToken) return;

      const raw = Math.min(1, (now - startTime) / duration);
      const eased =
        raw < 0.5
          ? 2 * raw * raw
          : 1 - Math.pow(-2 * raw + 2, 2) / 2;

      const current = targetAngle * eased;

      currentAngleEl.textContent = `${fmt(current)}°`;
      updateTurnInfo(current);

      anglePath.setAttribute("d", buildAnglePath(current));
      anglePath.setAttribute("opacity", current === 0 ? "0" : "1");

      setFinalRay(current, true);
      angleLabelGroup.setAttribute("opacity", "1");
      positionAngleLabel(current);

      if (raw < 1) {
        animationId = requestAnimationFrame(frame);
      } else {
        animationId = null;
        statusEl.textContent = "Hoàn thành";
        animateBtn.disabled = false;
      }
    }

    animationId = requestAnimationFrame(frame);
  }

  // ================= 3.1. SỰ KIỆN THẺ 2 =================
  if (animateBtn) {
    animateBtn.addEventListener("click", () => animateAngle(readAngle()));
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetVisual);
  }

  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") animateAngle(readAngle());
    });
  }

  if (unitSelect) {
    unitSelect.addEventListener("change", () => {
      // Giữ nguyên số đã nhập; đơn vị mới sẽ được áp dụng khi bấm Minh họa.
      // Chỉ cập nhật trạng thái trực quan nếu cần, không tự động chạy animation.
    });
  }

  // ================= 4. KHÓA XOAY NGANG (NẾU CÓ NÚT) =================
  const lockOrientationBtn = document.getElementById("lockOrientationBtn");

  if (lockOrientationBtn) {
    lockOrientationBtn.addEventListener("click", async () => {
      try {
        // Yêu cầu toàn màn hình (một số Android yêu cầu trước khi khóa hướng).
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }

        // Khóa màn hình ở hướng ngang nếu trình duyệt hỗ trợ.
        if (screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock("landscape");
        }
      } catch (err) {
        alert(
          "Thiết bị hoặc trình duyệt không hỗ trợ tự động xoay. Vui lòng bật 'Tự động xoay' trên điện thoại và xoay ngang máy."
        );
      }
    });
  }

  // Khởi tạo trạng thái Thẻ 2.
  resetVisual();

  // ================= 5. THẺ 3 - KIỂM TRA PHẢN XẠ =================
  const quizNameInput = document.getElementById("quizNameInput");
  const quizTimeSelect = document.getElementById("quizTimeSelect");
  const quizStartBtn = document.getElementById("quizStartBtn");
  const quizResetBtn = document.getElementById("quizResetBtn");
  const quizJoinPanel = document.getElementById("quizJoinPanel");
  const quizGamePanel = document.getElementById("quizGamePanel");
  const quizResultPanel = document.getElementById("quizResultPanel");
  const quizStudentName = document.getElementById("quizStudentName");
  const quizScore = document.getElementById("quizScore");
  const quizQuestionNo = document.getElementById("quizQuestionNo");
  const quizTimer = document.getElementById("quizTimer");
  const quizQuestion = document.getElementById("quizQuestion");
  const quizOptions = document.getElementById("quizOptions");
  const quizFeedback = document.getElementById("quizFeedback");
  const quizResultName = document.getElementById("quizResultName");
  const quizFinalScore = document.getElementById("quizFinalScore");
  const quizStartAgainBtn = document.getElementById("quizStartAgainBtn");

  const QUIZ_ANGLES = [0, 30, 45, 60, 90, 120, 135, 150, 180];
  const QUIZ_FUNCTIONS = ["sin", "cos", "tan", "cot"];

  const QUIZ_VALUES = {
    sin: {
      0: "0", 30: "1/2", 45: "√2/2", 60: "√3/2", 90: "1",
      120: "√3/2", 135: "√2/2", 150: "1/2", 180: "0"
    },
    cos: {
      0: "1", 30: "√3/2", 45: "√2/2", 60: "1/2", 90: "0",
      120: "-1/2", 135: "-√2/2", 150: "-√3/2", 180: "-1"
    },
    tan: {
      0: "0", 30: "√3/3", 45: "1", 60: "√3", 90: "Không xác định",
      120: "-√3", 135: "-1", 150: "-√3/3", 180: "0"
    },
    cot: {
      0: "Không xác định", 30: "√3", 45: "1", 60: "√3/3", 90: "0",
      120: "-√3/3", 135: "-1", 150: "-√3", 180: "Không xác định"
    }
  };

  const QUIZ_FUNCTION_LABEL = {
    sin: "sin",
    cos: "cos",
    tan: "tan",
    cot: "cot"
  };

  let quizScoreValue = 0;
  let quizQuestionCount = 0;
  let quizTimerId = null;
  let quizTimeLeft = 0;
  let quizLocked = true;
  let quizCurrentAnswer = "";
  let quizStudent = "";

  function quizShuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function quizEscapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function quizValueToTex(value) {
    const map = {
      "√2/2": "\\frac{\\sqrt{2}}{2}",
      "√3/2": "\\frac{\\sqrt{3}}{2}",
      "√3/3": "\\frac{\\sqrt{3}}{3}",
      "√3": "\\sqrt{3}",
      "-√2/2": "-\\frac{\\sqrt{2}}{2}",
      "-√3/2": "-\\frac{\\sqrt{3}}{2}",
      "-√3/3": "-\\frac{\\sqrt{3}}{3}",
      "-√3": "-\\sqrt{3}",
      "Không xác định": "\\text{Không xác định}"
    };
    return map[value] || value;
  }

  function quizRenderMath(element, tex) {
    if (!element) return;

    // Không phụ thuộc tuyệt đối vào KaTeX. Nếu CDN chưa tải được,
    // câu hỏi và đáp án vẫn phải hiển thị bằng văn bản dễ đọc.
    if (window.katex && typeof window.katex.render === "function") {
      try {
        window.katex.render(tex, element, {
          throwOnError: false,
          displayMode: false
        });
        return;
      } catch (err) {
        // Rơi xuống chế độ văn bản bên dưới.
      }
    }

    element.textContent = tex
      .replace(/\\sqrt\{([^}]+)\}/g, "√$1")
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "$1/$2")
      .replace(/\\text\{([^}]+)\}/g, "$1")
      .replace(/\\circ/g, "°")
      .replace(/\\left/g, "")
      .replace(/\\right/g, "");
  }

  function quizRenderValue(element, value) {
    quizRenderMath(element, quizValueToTex(value));
  }

  function quizStopTimer() {
    if (quizTimerId !== null) {
      clearInterval(quizTimerId);
      quizTimerId = null;
    }
  }

  function quizUpdateTimer() {
    if (!quizTimer) return;
    const mode = Number(quizTimeSelect?.value || 0);
    if (!mode) {
      quizTimer.textContent = "Không giới hạn";
      quizTimer.classList.remove("quiz-timer-warning");
      return;
    }
    quizTimer.textContent = `${quizTimeLeft}s`;
    quizTimer.classList.toggle("quiz-timer-warning", quizTimeLeft <= 2);
  }

  function quizStartTimer() {
    quizStopTimer();
    const mode = Number(quizTimeSelect?.value || 0);
    if (!mode) {
      quizUpdateTimer();
      return;
    }

    quizTimeLeft = mode;
    quizUpdateTimer();

    quizTimerId = setInterval(() => {
      if (quizLocked) return;
      quizTimeLeft -= 1;
      quizUpdateTimer();
      if (quizTimeLeft <= 0) {
        quizStopTimer();
        quizAnswer(null, true);
      }
    }, 1000);
  }

  function quizSetPanels(join, game, result) {

  if (quizJoinPanel) {
    quizJoinPanel.classList.toggle("hidden", !join);
  } else {
    console.error("❌ quizJoinPanel KHÔNG tồn tại!");
  }

  if (quizGamePanel) {
    quizGamePanel.classList.toggle("hidden", !game);
    
  } else {
    console.error("❌ quizGamePanel KHÔNG tồn tại!");
  }

  if (quizResultPanel) {
    quizResultPanel.classList.toggle("hidden", !result);
    
  } else {
    console.error("❌ quizResultPanel KHÔNG tồn tại!");
  }
}

  function quizUpdateScore() {
    if (quizScore) quizScore.textContent = `${quizScoreValue}/20`;
    if (quizQuestionNo) quizQuestionNo.textContent = `Câu ${quizQuestionCount}`;
  }

// =====================================================
// BỘ SINH CÂU HỎI - KHÔNG LẶP TRONG CÙNG MỘT CHU KỲ
// =====================================================

let quizQuestionPool = [];
let quizLastQuestionKey = null;


// Tạo toàn bộ tổ hợp: sin/cos/tan/cot × các góc
function quizCreateQuestionPool() {
  const pool = [];

  QUIZ_FUNCTIONS.forEach(fn => {
    QUIZ_ANGLES.forEach(angle => {
      pool.push({
        fn,
        angle,
        key: `${fn}_${angle}`
      });
    });
  });

  return quizShuffle(pool);
}


// Lấy câu hỏi tiếp theo
function quizGetNextQuestion() {

  // Nếu chưa có pool hoặc pool đã hết
  if (quizQuestionPool.length === 0) {
    quizQuestionPool = quizCreateQuestionPool();
  }

  // Lấy câu đầu tiên
  let question = quizQuestionPool.shift();

  // Đảm bảo không trùng câu ngay trước
  if (
    question.key === quizLastQuestionKey &&
    quizQuestionPool.length > 0
  ) {
    const anotherIndex =
      Math.floor(Math.random() * quizQuestionPool.length);

    const anotherQuestion =
      quizQuestionPool.splice(anotherIndex, 1)[0];

    // Đưa câu vừa lấy lại vào pool
    quizQuestionPool.push(question);

    question = anotherQuestion;
  }

  quizLastQuestionKey = question.key;

  return question;
}

  function quizBuildQuestion() {
  

  if (!quizQuestion || !quizOptions) {

    return;
  }


  // -------------------------------
  // Tăng số câu
  // -------------------------------
  quizQuestionCount += 1;
  quizLocked = false;



  const question = quizGetNextQuestion();

  const angle = question.angle;
  const fn = question.fn;

  quizCurrentAnswer = QUIZ_VALUES[fn][angle];


  // -------------------------------
  // Tạo câu hỏi
  // -------------------------------
  quizQuestion.innerHTML = "";

  const qPrefix = document.createElement("span");
  qPrefix.textContent = "Giá trị ";

  const qMath = document.createElement("span");

  const latexQuestion = `${fn}(${angle}^{\\circ})`;


  quizRenderMath(qMath, latexQuestion);


  const qSuffix = document.createElement("span");
  qSuffix.textContent = " = ?";

  quizQuestion.append(qPrefix, qMath, qSuffix);


  // -------------------------------
  // Fallback nếu KaTeX không render
  // -------------------------------
  if (!qMath.textContent.trim() && !qMath.innerHTML.trim()) {

    qMath.textContent = `${fn}(${angle}°)`;
  } 

  // -------------------------------
  // Tạo phương án
  // -------------------------------
  const allValues = Object.values(QUIZ_VALUES[fn]);

  const filteredValues =
    allValues.filter(v => v !== quizCurrentAnswer);

  const distractors =
    quizShuffle(filteredValues);


  const options =
    quizShuffle([
      quizCurrentAnswer,
      ...distractors.slice(0, 3)
    ]);


  // -------------------------------
  // Render phương án
  // -------------------------------
  quizOptions.innerHTML = "";


  options.forEach((value, index) => {


    const btn = document.createElement("button");

    btn.type = "button";
    btn.className = "quiz-option";
    btn.dataset.value = value;

    btn.innerHTML =
      `<span class="quiz-option-letter">
        ${String.fromCharCode(65 + index)}
      </span>
      <span class="quiz-option-math"></span>`;

    const mathElement =
      btn.querySelector(".quiz-option-math");


    quizRenderValue(mathElement, value);



    btn.addEventListener(
      "click",
      () => quizAnswer(value, false)
    );

    quizOptions.appendChild(btn);
  });


  // -------------------------------
  // Feedback
  // -------------------------------
  if (quizFeedback) {
    quizFeedback.textContent = "";
    quizFeedback.className = "quiz-feedback";

    
  } else {
    console.warn("⚠️ quizFeedback không tồn tại");
  }
  quizUpdateScore();

  quizStartTimer();

}

  function quizAnswer(value, timeout = false) {
    if (quizLocked) return;
    quizLocked = true;
    quizStopTimer();

    const correct = value === quizCurrentAnswer;
    quizScoreValue = correct ? quizScoreValue + 1 : 0;

    quizOptions?.querySelectorAll("button").forEach(btn => {
      btn.disabled = true;
      const btnValue = btn.dataset.value;
      if (btnValue === quizCurrentAnswer) btn.classList.add("quiz-correct");
      if (value !== null && btnValue === value && !correct) btn.classList.add("quiz-wrong");
    });

    if (quizFeedback) {
      quizFeedback.className = `quiz-feedback ${correct ? "correct" : "wrong"}`;
      quizFeedback.textContent = correct
        ? "✓ Chính xác! +1 điểm"
        : timeout
          ? "⌛ Hết giờ! Điểm trở về 0"
          : "✗ Chưa đúng! Điểm trở về 0";
    }

    quizUpdateScore();

    if (quizScoreValue >= 20) {
      setTimeout(quizFinish, 700);
    } else {
      setTimeout(quizBuildQuestion, 650);
    }
  }

  function quizStart() {
    const name = quizNameInput?.value.trim() || "";
    if (!name) {
      quizNameInput?.focus();
      if (quizFeedback) {
        quizFeedback.textContent = "Vui lòng nhập tên trước khi bắt đầu.";
        quizFeedback.className = "quiz-feedback wrong";
      }
      return;
    }

    quizStudent = name;
    quizScoreValue = 0;
    quizQuestionCount = 0;
    quizLocked = true;
    quizStopTimer();

	
    if (quizStudentName) quizStudentName.textContent = quizStudent;
    quizSetPanels(false, true, false);
	

	
    quizBuildQuestion();
  }

  function quizFinish() {
    quizStopTimer();
    quizLocked = true;
    if (quizResultName) quizResultName.textContent = quizStudent;
    if (quizFinalScore) quizFinalScore.textContent = "20/20";
    quizSetPanels(false, false, true);
  }

  function quizReset() {
    quizStopTimer();
    quizLocked = true;
    quizScoreValue = 0;
    quizQuestionCount = 0;
    quizCurrentAnswer = "";
    quizStudent = "";
    if (quizNameInput) quizNameInput.value = "";
    if (quizFeedback) quizFeedback.textContent = "";
    quizSetPanels(true, false, false);
    quizUpdateTimer();
  }

  if (quizStartBtn) quizStartBtn.addEventListener("click", quizStart);
  if (quizResetBtn) quizResetBtn.addEventListener("click", quizReset);
  if (quizStartAgainBtn) {
    quizStartAgainBtn.addEventListener("click", () => {
      quizSetPanels(true, false, false);
      quizNameInput?.focus();
    });
  }
  if (quizNameInput) {
    quizNameInput.addEventListener("keydown", e => {
      if (e.key === "Enter") quizStart();
    });
  }
  if (quizTimeSelect) quizTimeSelect.addEventListener("change", quizUpdateTimer);

  quizSetPanels(true, false, false);
  quizUpdateTimer();

});

const fullscreenBtn = document.getElementById("fullscreen-btn");

if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", () => {
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    });
}