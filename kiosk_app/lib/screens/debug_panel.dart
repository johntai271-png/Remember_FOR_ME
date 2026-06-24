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
        title: const Text('Bảng thử nghiệm (Debug)'),
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
                    label: 'Trạng thái Ngoại',
                    value: _statusVi(sync.elderStatus),
                  ),
                  const SizedBox(height: 12),
                  _InfoTile(
                    label: 'Nhịp tim (mô phỏng)',
                    value: sync.heartRateBpm != null
                        ? '${sync.heartRateBpm} nhịp/phút'
                        : 'Chưa có',
                  ),
                  const SizedBox(height: 12),
                  _InfoTile(
                    label: 'BLE',
                    value: sync.bleEnabled
                        ? 'Đang quét tag ${sync.tagId}'
                        : 'Đang tắt',
                  ),
                  const SizedBox(height: 28),
                  FilledButton(
                    onPressed: () => sync.setElderStatus('in_home'),
                    style: FilledButton.styleFrom(
                      backgroundColor: AppColors.action,
                      padding: const EdgeInsets.symmetric(vertical: 20),
                    ),
                    child: const Text('Mô phỏng: Trong nhà',
                        style: TextStyle(fontSize: 20)),
                  ),
                  const SizedBox(height: 12),
                  FilledButton.tonal(
                    onPressed: () => sync.setElderStatus('out_of_home'),
                    style: FilledButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 20),
                    ),
                    child: const Text('Mô phỏng: Ra ngoài',
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
      'in_home' => 'Trong nhà',
      'out_of_home' => 'Ra ngoài',
      _ => 'Chưa rõ',
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
