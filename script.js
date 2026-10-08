document.addEventListener("DOMContentLoaded", () => {
  // ================= 1. QUẢN LÝ CHUYỂN TAB =================
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
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

	// Khai báo presetBtns
	const presetBtns = document.querySelectorAll(".btn-preset");

	// Khai báo các nút & khối ẩn/hiện
	const toggleTrigBtn = document.getElementById("toggleTrigBtn");
	const trigBlock = document.getElementById("trigBlock");
	const toggleProjBtn = document.getElementById("toggleProjBtn");
	const projLabelsGroup = document.getElementById("projLabelsGroup");

	// Khai báo chân hình chiếu H và K
	const dotH = document.getElementById("dotH");
	const labelH = document.getElementById("labelH");
	const dotK = document.getElementById("dotK");
	const labelK = document.getElementById("labelK");

	const R = 150; // Bán kính đường tròn trên SVG

// Hàm ẩn khối giá trị lượng giác và reset trạng thái nút
function hideTrigValues() {
  trigBlock.classList.add("hidden");
  toggleTrigBtn.textContent = "👁️ Hiện giá trị lượng giác";
}

function updateTab1(deg) {
  angleValT1.textContent = deg;
  const rad = (deg * Math.PI) / 180;

  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const cx = R * cos;
  const cy = -R * sin;

  // Cập nhật M & OM
  radiusOM.setAttribute("x2", cx);
  radiusOM.setAttribute("y2", cy);
  dotM.setAttribute("cx", cx);
  dotM.setAttribute("cy", cy);

  labelM.setAttribute("x", cx + (cx >= 0 ? 10 : -25));
  labelM.setAttribute("y", cy - 10);

  // Đường chiếu
  projX.setAttribute("x1", cx); projX.setAttribute("y1", cy);
  projX.setAttribute("x2", cx); projX.setAttribute("y2", 0);

  projY.setAttribute("x1", cx); projY.setAttribute("y1", cy);
  projY.setAttribute("x2", 0);  projY.setAttribute("y2", cy);

  // Cập nhật Chân hình chiếu H (trên Ox)
  if (dotH && labelH) {
    dotH.setAttribute("cx", cx);
    dotH.setAttribute("cy", 0);
    labelH.setAttribute("x", cx);
    labelH.setAttribute("y", 22);
    labelH.textContent = `x = ${cos.toFixed(3)}`;
  }

  // Cập nhật Chân hình chiếu K (trên Oy)
  if (dotK && labelK) {
    dotK.setAttribute("cx", 0);
    dotK.setAttribute("cy", cy);
    labelK.setAttribute("x", cx >= 0 ? -10 : 10);
    labelK.setAttribute("y", cy + 4);
    labelK.setAttribute("text-anchor", cx >= 0 ? "end" : "start");
    labelK.textContent = `y = ${sin.toFixed(3)}`;
  }

  // Cung góc α
  const arcR = 40;
  const ax = arcR * cos;
  const ay = -arcR * sin;
  arcT1.setAttribute("d", `M ${arcR},0 A ${arcR},${arcR} 0 0,0 ${ax},${ay}`);

  // Giá trị lượng giác
  coordM.textContent = `M(${cos.toFixed(2)}, ${sin.toFixed(2)})`;
  cosVal.textContent = cos.toFixed(3);
  sinVal.textContent = sin.toFixed(3);

  if (Math.abs(deg - 90) < 0.1) {
    tanVal.textContent = "Không xác định";
  } else {
    tanVal.textContent = Math.tan(rad).toFixed(3);
  }

  if (deg === 0 || deg === 180) {
    cotVal.textContent = "Không xác định";
  } else {
    cotVal.textContent = (1 / Math.tan(rad)).toFixed(3);
  }
}

// C. BẮT SỰ KIỆN (VIẾT DƯỚI CÙNG SAU HÀM VÀ BIẾN)
if (toggleTrigBtn) {
  toggleTrigBtn.addEventListener("click", () => {
    const isHidden = trigBlock.classList.toggle("hidden");
    toggleTrigBtn.textContent = isHidden ? "👁️ Hiện giá trị lượng giác" : "🙈 Ẩn giá trị lượng giác";
  });
}

if (toggleProjBtn) {
  toggleProjBtn.addEventListener("click", () => {
    const isHidden = projLabelsGroup.classList.toggle("hidden");
    toggleProjBtn.textContent = isHidden ? "📍 Hiện tọa độ x, y" : "📍 Ẩn tọa độ x, y";
  });
}

sliderT1.addEventListener("input", (e) => {
  hideTrigValues();
  updateTab1(Number(e.target.value));
});

presetBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const angle = Number(btn.dataset.angle);
    sliderT1.value = angle;
    hideTrigValues();
    updateTab1(angle);
  });
});

// Chạy khởi tạo Thẻ 1
updateTab1(60);

  sliderT1.addEventListener("input", (e) => updateTab1(Number(e.target.value)));

  presetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const angle = Number(btn.dataset.angle);
      sliderT1.value = angle;
      updateTab1(angle);
    });
  });

  // Khởi tạo Thẻ 1 ban đầu
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
  let currentUnit = "deg";

  function fmt(n) {
    if (Math.abs(n) < 1e-9) return "0";
    return Number(n.toFixed(2)).toString();
  }

  function degToRad(deg) { return (deg * Math.PI) / 180; }

  function pointAt(angleDeg, radius) {
    const t = degToRad(angleDeg);
    return { x: radius * Math.cos(t), y: -radius * Math.sin(t) };
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
    const p = pointAt(angleDeg, RAY_LENGTH);
    finalRay.setAttribute("x2", p.x); finalRay.setAttribute("y2", p.y);
    tipDot.setAttribute("cx", p.x); tipDot.setAttribute("cy", p.y);
    pointMLabel.setAttribute("x", p.x + 12); pointMLabel.setAttribute("y", p.y - 12);

    const opacityVal = visible ? "1" : "0";
    finalRay.setAttribute("opacity", opacityVal);
    tipDot.setAttribute("opacity", opacityVal);
    pointMLabel.setAttribute("opacity", opacityVal);
  }

  function positionAngleLabel(angleDeg) {
    const absAngle = Math.abs(angleDeg);
    const radius = ARC_BASE + Math.min(48, Math.floor(absAngle / 360) * 13) + 30;
    const p = pointAt(angleDeg, radius);

    const x = Math.max(-350, Math.min(350, p.x));
    const y = Math.max(-250, Math.min(250, p.y));

    angleLabelGroup.setAttribute("transform", `translate(${x} ${y})`);
    angleLabelBg.setAttribute("x", "-70"); angleLabelBg.setAttribute("y", "-34");
    angleLabelBg.setAttribute("width", "140");
    angleLabel.textContent = `${fmt(angleDeg)}°`;
  }

  function updateTurnInfo(angleDeg) {
    const absAngle = Math.abs(angleDeg);
    const fullTurns = Math.floor(absAngle / 360);
    const rem = absAngle % 360;

    if (absAngle === 0) { turnsEl.textContent = "0 vòng"; return; }
    if (rem < 0.01) turnsEl.textContent = `${fullTurns} vòng`;
    else if (fullTurns > 0) turnsEl.textContent = `${fullTurns} vòng + ${fmt(rem)}°`;
    else turnsEl.textContent = `${fmt(rem)}°`;
  }

  function resetVisual() {
    runToken++;
    if (animationId !== null) cancelAnimationFrame(animationId);

    currentAngleEl.textContent = "0°";
    directionEl.textContent = "—";
    statusEl.textContent = "Sẵn sàng";
    turnsEl.textContent = "0 vòng";

    anglePath.setAttribute("d", "");
    anglePath.setAttribute("opacity", "0");
    finalRay.setAttribute("opacity", "0");
    tipDot.setAttribute("opacity", "0");
    pointMLabel.setAttribute("opacity", "0");
    angleLabelGroup.setAttribute("opacity", "0");
    rotationLabel.textContent = "Tia đang chờ quay...";
    animateBtn.disabled = false;
  }

  function readAngle() {
    let raw = input.value.trim().toLowerCase();
    if (!raw) return 0;
    let val = 0;
    if (raw.includes("pi")) {
      let replaced = raw.replace(/pi/g, Math.PI.toString()).replace(/(\d)(Math\.PI)/g, "$1*$2");
      try { val = Function(`"use strict"; return (${replaced})`)(); } catch (e) { val = NaN; }
    } else { val = Number(raw); }

    if (!Number.isFinite(val)) return 0;
    return unitSelect.value === "rad" ? val * (180 / Math.PI) : val;
  }

  function animateAngle(targetAngle) {
    const token = ++runToken;
    if (animationId !== null) cancelAnimationFrame(animationId);

    const duration = Math.min(14000, Math.max(1200, 1200 + Math.abs(targetAngle) * 8));

    directionEl.textContent = targetAngle > 0 ? "Ngược chiều KĐH" : targetAngle < 0 ? "Theo chiều KĐH" : "Không quay";
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
      const eased = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
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

  animateBtn.addEventListener("click", () => animateAngle(readAngle()));
  resetBtn.addEventListener("click", resetVisual);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") animateAngle(readAngle()); });

  resetVisual();
});





// Bắt sự kiện Click nút Toggle
toggleTrigBtn.addEventListener("click", () => {
  const isHidden = trigBlock.classList.toggle("hidden");
  if (isHidden) {
    toggleTrigBtn.textContent = "👁️ Hiện giá trị lượng giác";
  } else {
    toggleTrigBtn.textContent = "🙈 Ẩn giá trị lượng giác";
  }
});

// Sửa lại sự kiện thay đổi góc (Slider) -> Tự động ẩn giá trị khi thay đổi góc
sliderT1.addEventListener("input", (e) => {
  hideTrigValues(); // Ẩn khi góc thay đổi
  updateTab1(Number(e.target.value));
});

// Sửa lại sự kiện bấm Nút góc đặc biệt -> Tự động ẩn giá trị khi chọn góc mới
presetBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const angle = Number(btn.dataset.angle);
    sliderT1.value = angle;
    hideTrigValues(); // Ẩn khi chọn góc mới
    updateTab1(angle);
  });
});


// 1. Lắng nghe sự kiện Bật/Tắt hiển thị tọa độ chân hình chiếu
toggleProjBtn.addEventListener("click", () => {
  const isHidden = projLabelsGroup.classList.toggle("hidden");
  if (isHidden) {
    toggleProjBtn.textContent = "📍 Hiện giá trị chân hình chiếu (H, K)";
  } else {
    toggleProjBtn.textContent = "📍 Ẩn giá trị chân hình chiếu (H, K)";
  }
});


// Bổ sung vào cuối đoạn script.js hiện tại:
const lockOrientationBtn = document.getElementById("lockOrientationBtn");

if (lockOrientationBtn) {
  lockOrientationBtn.addEventListener("click", async () => {
    try {
      // Yêu cầu Toàn màn hình (yêu cầu bắt buộc trên Android trước khi khóa hướng)
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
      
      // Khóa màn hình ở hướng xoay ngang (Landscape)
      if (screen.orientation && screen.orientation.lock) {
        await screen.orientation.lock("landscape");
      }
    } catch (err) {
      alert("Thiết bị hoặc trình duyệt không hỗ trợ tự động xoay. Vui lòng bật 'Tự động xoay' trên điện thoại và xoay ngang máy.");
    }
  });
}