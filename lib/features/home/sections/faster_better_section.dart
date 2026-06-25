import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:video_player/video_player.dart';

class FasterBetterSection extends StatefulWidget {
  const FasterBetterSection({super.key, required this.sectionHeight});

  final double sectionHeight;

  @override
  State<FasterBetterSection> createState() => _FasterBetterSectionState();
}

class _FasterBetterSectionState extends State<FasterBetterSection> {
  late final VideoPlayerController _videoController;

  @override
  void initState() {
    super.initState();
    _videoController = VideoPlayerController.asset(
      'assets/images/home/section2/bold_video.mp4',
    )..initialize().then((_) {
        if (!mounted) return;
        _videoController
          ..setLooping(true)
          ..setVolume(0)
          ..play();
        setState(() {});
      });
  }

  @override
  void dispose() {
    _videoController.dispose();
    super.dispose();
  }

  TextStyle _sideTextStyle(double fontSize) => GoogleFonts.urbanist(
        color: Colors.white,
        fontSize: fontSize,
        fontWeight: FontWeight.w700,
        height: 1.0,
        letterSpacing: -1,
      );

  TextStyle get _centerTextStyle => GoogleFonts.urbanist(
        color: Colors.white,
        fontSize: 18,
        fontWeight: FontWeight.w400,
        height: 1.5,
      );

  @override
  Widget build(BuildContext context) {
    final sectionHeight = widget.sectionHeight;
    final sideFontSize = sectionHeight * 0.14;

    return SizedBox(
      height: sectionHeight,
      width: double.infinity,
      child: Stack(
        fit: StackFit.expand,
        clipBehavior: Clip.hardEdge,
        children: [
          if (_videoController.value.isInitialized)
            FittedBox(
              fit: BoxFit.cover,
              child: SizedBox(
                width: _videoController.value.size.width,
                height: _videoController.value.size.height,
                child: VideoPlayer(_videoController),
              ),
            )
          else
            const ColoredBox(color: Colors.black),
          Align(
            alignment: Alignment.centerLeft,
            child: Padding(
              padding: const EdgeInsets.only(left: 48),
              child: RotatedBox(
                quarterTurns: 3,
                child: Text(
                  'Bold ideas',
                  style: _sideTextStyle(sideFontSize),
                ),
              ),
            ),
          ),
          Align(
            alignment: Alignment.centerRight,
            child: Padding(
              padding: const EdgeInsets.only(right: 48),
              child: RotatedBox(
                quarterTurns: 3,
                child: Text(
                  'beautifully built',
                  style: _sideTextStyle(sideFontSize),
                ),
              ),
            ),
          ),
          Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 120),
              child: Text(
                'A two-person product studio.\n'
                'We design and build digital products by\n'
                'hand, end to end.',
                textAlign: TextAlign.center,
                style: _centerTextStyle,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
