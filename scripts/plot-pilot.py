"""Render the published pilot as a shareable chart (optional: matplotlib 3.10+)."""

import json
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt


ROOT = Path(__file__).resolve().parents[1]
runs = json.loads((ROOT / "results/pilot.json").read_text())["runs"]
settings = [
    ("gpt-5.6-sol", "medium", "Sol medium", "#879990"),
    ("gpt-6-astra", "low", "Astra low", "#355f49"),
    ("gpt-6-astra", "medium", "Astra medium", "#60815b"),
    ("gpt-6-astra", "high", "Astra high", "#8aa06d"),
]
tasks = [
    ("abort-delay", "Abort before retry delay"),
    ("abort-cleanup", "Remove finished listeners"),
]

if len(runs) != 8:
    raise ValueError("This chart describes the original eight-run pilot only.")

plt.rcParams.update({"font.family": "DejaVu Sans", "svg.fonttype": "none", "svg.hashsalt": "astra-sweetspot-pilot"})
background = "#f6f5f0"
ink = "#162f2b"
muted = "#52675e"
fig = plt.figure(figsize=(12, 6.3), dpi=100, facecolor=background)
fig.text(0.045, 0.933, "ASTRA SWEETSPOT  /  SEPTEMBER 5, 2026", color=muted, fontsize=12)
fig.text(0.045, 0.851, "Astra vs Sol on two public bugs", color=ink, fontsize=28, weight="bold")
fig.text(0.045, 0.791, "All 8 runs passed their focused regression checks.", color=muted, fontsize=15)

for column, (case, title) in enumerate(tasks):
    rows = []
    for model, effort, _, _ in settings:
        matches = [r for r in runs if (r["case"], r["requestedModel"], r["effort"]) == (case, model, effort)]
        if len(matches) != 1:
            raise ValueError(f"Expected one run for {case}/{model}/{effort}")
        row = matches[0]
        if row["status"] != "completed" or row["verification"]["passed"] != row["verification"]["total"]:
            raise ValueError("Update the chart's pass statement before plotting changed results.")
        rows.append(row)

    ax = fig.add_axes([0.171 + column * 0.481, 0.310, 0.305, 0.366], facecolor=background)
    ax.set_title(title, loc="left", fontsize=14, color=ink, pad=31, weight="bold")
    total = rows[0]["verification"]["total"]
    ax.text(0, 1.045, f"{total}/{total} focused checks passed by each run", transform=ax.transAxes, color=muted, fontsize=10)
    ax.barh(range(4), [r["elapsedSeconds"] for r in rows], color=[s[3] for s in settings], height=0.57, zorder=3)
    ax.set_yticks(range(4), [s[2] for s in settings], fontsize=12, color=ink)
    ax.invert_yaxis()
    ax.set_xlim(0, 195)
    ax.set_xticks([0, 60, 120, 180])
    ax.tick_params(axis="both", length=0, labelcolor=muted, pad=10)
    ax.set_xlabel("Wall time (seconds)", color=muted, fontsize=11, labelpad=10)
    ax.grid(axis="x", color="#d5dcd1", linewidth=0.8, zorder=0)
    for spine in ax.spines.values():
        spine.set_visible(False)
    for i, row in enumerate(rows):
        ax.text(row["elapsedSeconds"] + 3, i, f'{row["elapsedSeconds"]:.1f}', va="center", color=ink, fontsize=11)

fig.text(0.045, 0.168, "One attempt per requested setting and task. This does not establish reliability.", color=ink, fontsize=12)
fig.text(0.045, 0.126, "Historical p-retry bugs. Time includes Codex startup and its tests. No quota comparison.", color=muted, fontsize=11)
fig.text(0.045, 0.052, "npx astra-sweetspot", color=ink, family="DejaVu Sans Mono", fontsize=16, weight="bold")
fig.text(0.96, 0.057, "github.com/sjh9714/astra-sweetspot", ha="right", color=muted, fontsize=12)

for extension in ("png", "svg"):
    destination = ROOT / "docs" / f"pilot-chart.{extension}"
    metadata = {"Title": "Astra Sweetspot: eight-run pilot"}
    if extension == "svg":
        metadata["Date"] = None
    fig.savefig(destination, facecolor=background, metadata=metadata)
    if extension == "svg":
        destination.write_text("\n".join(line.rstrip() for line in destination.read_text().splitlines()) + "\n")
    print(destination.relative_to(ROOT))
plt.close(fig)
