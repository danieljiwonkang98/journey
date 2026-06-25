import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ScrollFillText extends StatelessWidget {
  const ScrollFillText({
    super.key,
    required this.text,
    required this.fillProgress,
    this.fontSize = 56,
    this.fontWeight = FontWeight.w600,
    this.height = 1.15,
    this.letterSpacing = -0.5,
    this.unfilledColor = const Color(0xFF3A3A3A),
    this.textAlign = TextAlign.left,
  });

  final String text;
  final double fillProgress;
  final double fontSize;
  final FontWeight fontWeight;
  final double height;
  final double letterSpacing;
  final Color unfilledColor;
  final TextAlign textAlign;

  TextStyle get _textStyle => GoogleFonts.urbanist(
    fontSize: fontSize,
    fontWeight: fontWeight,
    height: height,
    letterSpacing: letterSpacing,
  );

  @override
  Widget build(BuildContext context) {
    final clampedProgress = fillProgress.clamp(0.0, 1.0);

    return Stack(
      children: [
        Text(
          text,
          textAlign: textAlign,
          style: _textStyle.copyWith(color: unfilledColor),
        ),
        ClipRect(
          child: Align(
            alignment: Alignment.topLeft,
            heightFactor: clampedProgress == 0 ? 0.001 : clampedProgress,
            child: Text(
              text,
              textAlign: textAlign,
              style: _textStyle.copyWith(color: Colors.white),
            ),
          ),
        ),
      ],
    );
  }
}

double lineFillProgress({
  required double sectionProgress,
  required int lineIndex,
  required int lineCount,
}) {
  final segment = 1.0 / lineCount;
  final lineStart = lineIndex * segment;
  return ((sectionProgress - lineStart) / segment).clamp(0.0, 1.0);
}

/// Progress of a content block scrolling up through the viewport.
///
/// Tracks the vertical center of the keyed widget. Returns 0 while the center
/// sits at [startViewportRatio] of the viewport height (lower on screen) and
/// 1 once it reaches [endViewportRatio] (higher on screen), so the fill
/// animation plays while the content is visibly rising into view.
double scrollSectionProgress(
  BuildContext context,
  GlobalKey key, {
  double startViewportRatio = 0.9,
  double endViewportRatio = 0.3,
}) {
  final renderObject = key.currentContext?.findRenderObject();
  if (renderObject is! RenderBox || !renderObject.hasSize) return 0;

  final viewportHeight = MediaQuery.sizeOf(context).height;
  final box = renderObject;
  final widgetCenter = box.localToGlobal(Offset.zero).dy + box.size.height / 2;
  final startY = viewportHeight * startViewportRatio;
  final endY = viewportHeight * endViewportRatio;

  return ((startY - widgetCenter) / (startY - endY)).clamp(0.0, 1.0);
}
