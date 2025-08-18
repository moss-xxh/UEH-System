// 自动化条件设置模态框组件
(function() {
    'use strict';
    
    // 确保全局变量初始化
    window.chargeTimeSegments = window.chargeTimeSegments || [{ start: '22:00', end: '06:00' }];
    window.dischargeTimeSegments = window.dischargeTimeSegments || [{ start: '16:00', end: '21:00' }];
    
    // 创建模态框HTML
    function createModalHTML() {
        return `
        <!-- Condition Settings Modal -->
        <div id="modalContent" class="modal-content" style="display: none; position: fixed; top: 5%; left: calc(50% - 450px); background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0; overflow: hidden; width: 900px; max-width: 95%; max-height: 90vh; border-radius: 16px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); overflow-y: auto; z-index: 2147483648; transition: none; user-select: none; cursor: move;">
            <div class="modal-header" style="padding: 24px 32px 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); display: flex; align-items: center; justify-content: space-between; background: rgba(255, 255, 255, 0.02); position: sticky; top: 0; z-index: 1;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <h3 style="margin: 0; font-size: 18px; font-weight: 700; color: #fff;" data-i18n="automationConditionsSettings">自动化条件设置</h3>
                    <span id="modalRegionName" style="padding: 4px 12px; background: var(--color-primary); color: #000; border-radius: 20px; font-size: 12px; font-weight: 600;">NSW</span>
                </div>
                <button onclick="closeConditionSettingsModal()" style="background: none; border: none; color: rgba(255,255,255,0.6); font-size: 24px; cursor: pointer; padding: 0; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='none'">×</button>
            </div>
            
            <div class="modal-body" style="padding: 24px 32px;">
                <div style="color: #fff; font-size: 14px; margin-bottom: 20px;">
                    <span data-i18n="conditionSettingsDescription">设置自动化充放电条件</span>
                </div>
            </div>
            
            <div class="modal-footer" style="padding: 16px 32px; background: rgba(0, 0, 0, 0.2); border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: flex-end; gap: 12px; position: sticky; bottom: 0;">
                <button onclick="closeConditionSettingsModal()" style="background: rgba(255, 255, 255, 0.08); color: rgba(255, 255, 255, 0.8); border: 1px solid rgba(255, 255, 255, 0.1); padding: 10px 20px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.3s;" data-i18n="cancel">取消</button>
                <button onclick="saveCurrentRegionSettings()" style="background: linear-gradient(135deg, #00ff88, #00dd77); color: #000; padding: 10px 20px; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.3s; border: none;" data-i18n="saveSettings">保存设置</button>
            </div>
        </div>
        `;
    }
    
    // 模态框拖拽功能
    function makeModalDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        element.onmousedown = dragMouseDown;
        
        // 动态设置光标
        element.addEventListener('mouseover', function(e) {
            const target = e.target;
            if (target.tagName === 'BUTTON' || target.tagName === 'INPUT' || target.tagName === 'SELECT' || 
                target.tagName === 'TEXTAREA' || target.closest('button') || target.closest('input') ||
                target.closest('select') || target.closest('textarea')) {
                return;
            } else {
                element.style.cursor = 'move';
            }
        });

        function dragMouseDown(e) {
            e = e || window.event;
            
            // 如果点击的是按钮或表单元素，不启动拖拽
            const target = e.target;
            if (target.tagName === 'BUTTON' || target.tagName === 'INPUT' || target.tagName === 'SELECT' || 
                target.tagName === 'TEXTAREA' || target.closest('button') || target.closest('input') ||
                target.closest('select') || target.closest('textarea')) {
                return;
            }
            
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            element.style.cursor = 'grabbing';
            element.style.transition = 'none';
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            let newTop = element.offsetTop - pos2;
            let newLeft = element.offsetLeft - pos1;
            
            // 边界检测
            const rect = element.getBoundingClientRect();
            const maxX = window.innerWidth - rect.width;
            const maxY = window.innerHeight - rect.height;
            
            newLeft = Math.max(0, Math.min(newLeft, maxX));
            newTop = Math.max(0, Math.min(newTop, maxY));
            
            element.style.top = newTop + "px";
            element.style.left = newLeft + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            element.style.cursor = 'move';
            element.style.transition = 'none';
            
            // 保存拖拽后的位置
            if (localStorage.getItem('conditionSettingsModalOpen') === 'true') {
                localStorage.setItem('modalPosition', JSON.stringify({
                    top: element.style.top,
                    left: element.style.left
                }));
            }
        }
    }
    
    // 打开模态框
    function openConditionSettingsModal() {
        console.log('Opening condition settings modal...');
        
        // 确保全局变量已初始化
        if (!window.chargeTimeSegments) {
            window.chargeTimeSegments = [{ start: '22:00', end: '06:00' }];
        }
        if (!window.dischargeTimeSegments) {
            window.dischargeTimeSegments = [{ start: '16:00', end: '21:00' }];
        }
        
        const modalContent = document.getElementById('modalContent');
        if (!modalContent) {
            console.error('Modal content element not found!');
            return;
        }
        
        modalContent.style.display = 'block';
        
        // 保存模态框打开状态到localStorage
        localStorage.setItem('conditionSettingsModalOpen', 'true');
        localStorage.setItem('modalPosition', JSON.stringify({
            top: modalContent.style.top || '5%',
            left: modalContent.style.left || 'calc(50% - 450px)'
        }));
        
        // 初始化模态框拖拽功能
        makeModalDraggable(modalContent);
        
        // 强制设置最高层级
        modalContent.style.setProperty('z-index', '2147483648', 'important');
        modalContent.style.setProperty('position', 'fixed', 'important');
        
        // 更新翻译
        if (window.i18n && window.i18n.isReady) {
            window.i18n.updatePageTexts();
        }
    }
    
    // 关闭模态框
    function closeConditionSettingsModal() {
        console.log('Closing condition settings modal...');
        const modalContent = document.getElementById('modalContent');
        if (modalContent) {
            modalContent.style.display = 'none';
            
            // 清除localStorage状态
            localStorage.removeItem('conditionSettingsModalOpen');
            localStorage.removeItem('modalPosition');
        }
    }
    
    // 检查并恢复模态框状态
    function checkAndRestoreModal() {
        const isModalOpen = localStorage.getItem('conditionSettingsModalOpen');
        const savedPosition = localStorage.getItem('modalPosition');
        
        if (isModalOpen === 'true') {
            const modalContent = document.getElementById('modalContent');
            if (modalContent) {
                // 确保时间段变量已初始化
                window.chargeTimeSegments = window.chargeTimeSegments || [{ start: '22:00', end: '06:00' }];
                window.dischargeTimeSegments = window.dischargeTimeSegments || [{ start: '16:00', end: '21:00' }];
                
                // 恢复模态框显示
                modalContent.style.display = 'block';
                
                // 恢复位置
                if (savedPosition) {
                    try {
                        const position = JSON.parse(savedPosition);
                        modalContent.style.top = position.top;
                        modalContent.style.left = position.left;
                    } catch (e) {
                        console.error('Error parsing saved position:', e);
                    }
                }
                
                // 初始化拖拽功能
                makeModalDraggable(modalContent);
                
                // 强制设置最高层级
                modalContent.style.setProperty('z-index', '2147483648', 'important');
                modalContent.style.setProperty('position', 'fixed', 'important');
                
                // 更新翻译
                if (window.i18n && window.i18n.isReady) {
                    window.i18n.updatePageTexts();
                }
                
                console.log('Modal restored from localStorage');
            }
        }
    }
    
    // 保存设置的占位符函数
    function saveCurrentRegionSettings() {
        console.log('Saving current region settings...');
        closeConditionSettingsModal();
    }
    
    // 初始化组件
    function initConditionSettingsModal() {
        // 如果页面中还没有模态框，创建它
        if (!document.getElementById('modalContent')) {
            document.body.insertAdjacentHTML('beforeend', createModalHTML());
        }
        
        // 检查是否需要恢复模态框
        checkAndRestoreModal();
    }
    
    // 暴露全局函数
    window.openConditionSettingsModal = openConditionSettingsModal;
    window.closeConditionSettingsModal = closeConditionSettingsModal;
    window.checkAndRestoreModal = checkAndRestoreModal;
    window.saveCurrentRegionSettings = saveCurrentRegionSettings;
    
    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initConditionSettingsModal);
    } else {
        initConditionSettingsModal();
    }
    
    // 延迟检查（确保所有资源加载完成）
    setTimeout(checkAndRestoreModal, 1000);
    
})();