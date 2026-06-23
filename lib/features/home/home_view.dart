import 'package:flutter/material.dart';
import 'package:journey/features/home/sections/dont_just_take_word.dart';
import 'package:journey/features/home/sections/faster_better_section.dart';
import 'package:journey/features/home/sections/from_brief_to_build.dart';
import 'package:journey/features/home/sections/home_main_section.dart';
import 'package:journey/features/home/sections/over_big_guys.dart';
import 'package:journey/features/home/sections/speed_meet_quality.dart';

class HomeView extends StatelessWidget {
  const HomeView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: SingleChildScrollView(
        child: Column(
          children: [
            const HomeMainSection(),
            ColoredBox(
              color: Colors.white,
              child: Column(
                children: const [
                  FasterBetterSection(),
                  FromBriefToBuild(),
                  SpeedMeetQuality(),
                  OverBigGuys(),
                  DontJustTakeWord(),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
