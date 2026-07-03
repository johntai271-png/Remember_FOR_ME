import 'package:flutter/material.dart';

import '../services/kiosk_sync.dart';
import '../theme/app_colors.dart';

/// Trang ẩn để test (mở bằng long-press tiêu đề ở màn chính).
/// Cho phép mô phỏng in_home / out_of_home mà không cần thiết bị BLE thật.
class DebugPanel extends StatelessWidget {
  const DebugPanel({super.key, required this.sync});

  final KioskSyncService sync;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.shell,
      appBar: AppBar(
        title: const Text('Simulation & Debug Panel'),
        backgroundColor: Colors.white,
        foregroundColor: AppColors.ink,
        elevation: 0,
      ),
      body: SafeArea(
        child: ListenableBuilder(
          listenable: sync,
          builder: (context, _) {
            return Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  _InfoTile(
                    label: 'Elder Status',
                    value: _statusVi(sync.elderStatus),
                  ),
                  const SizedBox(height: 12),
                  _InfoTile(
                    label: 'Simulated Heart Rate',
                    value: sync.heartRateBpm != null
                        ? '${sync.heartRateBpm} BPM'
                        : 'No data',
                  ),
                  const SizedBox(height: 12),
                  _InfoTile(
                    label: 'BLE Proximity Tracker',
                    value: sync.bleEnabled
                        ? 'Scanning tag: ${sync.tagId}'
                        : 'Disabled',
                  ),
                  const SizedBox(height: 28),
                  FilledButton(
                    onPressed: () => sync.setElderStatus('in_home'),
                    style: FilledButton.styleFrom(
                      backgroundColor: AppColors.action,
                      padding: const EdgeInsets.symmetric(vertical: 20),
                    ),
                    child: const Text('Simulate: At Home',
                        style: TextStyle(fontSize: 20)),
                  ),
                  const SizedBox(height: 12),
                  FilledButton.tonal(
                    onPressed: () => sync.setElderStatus('out_of_home'),
                    style: FilledButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 20),
                    ),
                    child: const Text('Simulate: Away (Wandering)',
                        style: TextStyle(fontSize: 20)),
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }

  String _statusVi(String status) {
    return switch (status) {
      'in_home' => 'At Home',
      'out_of_home' => 'Away',
      _ => 'Unknown',
    };
  }
}

class _InfoTile extends StatelessWidget {
  const _InfoTile({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.cardBorder),
        boxShadow: const [AppColors.cardShadow],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label,
              style: const TextStyle(
                  color: AppColors.inkSoft, fontSize: 16)),
          const SizedBox(height: 6),
          Text(value,
              style: const TextStyle(
                  color: AppColors.ink,
                  fontSize: 22,
                  fontWeight: FontWeight.w700)),
        ],
      ),
    );
  }
}
